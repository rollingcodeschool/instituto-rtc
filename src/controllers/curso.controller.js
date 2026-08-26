import {
  actualizarCursoService,
  crearCursoService,
  detallesCursoService,
  eliminarCursoService,
  obtenerCursosService,
} from "../services/curso.service.js";

export const crearCurso = async (req, res) => {
  try {
    const datosCurso = req.body;
    const nuevoCurso = await crearCursoService(datosCurso);
    return res.status(201).json(nuevoCurso);
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({ error: "Ya existe un curso con ese nombre" });
    }
    return res.status(400).json({ error: error.message });
  }
};

export const obtenerCursos = async (req, res) => {
  try {
    const cursos = await obtenerCursosService();
    return res.json(cursos);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los cursos" });
  }
};

export const detallesCurso = async (req, res) => {
  try {
    const nombre = req.params.nombre;
    const detalles = await detallesCursoService(nombre);
    return res.status(200).json(detalles);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const actualizarCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const datosCurso = req.body;
    const cursoActualizado = await actualizarCursoService(id, datosCurso);
    return res.status(200).json(cursoActualizado);
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ error: "No se encontró el curso con el ID proporcionado" });
    }
    if (error.code === "P2002") {
      return res.status(400).json({
        error:
          "Ya existe un curso con ese nombre, por favor ingresa un nombre distinto",
      });
    }
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const eliminarCursoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarCursoService(id);
    return res.status(200).json({ message: "Curso eliminado correctamente" });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ error: "No se encontro el curso con el ID proporcionado" });
    }
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
