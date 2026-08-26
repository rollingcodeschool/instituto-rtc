import {
  actualizarAlumnoService,
  crearAlumnoService,
  eliminarAlumnoService,
  obtenerAlumnosService,
} from "../services/alumno.service.js";

export const crearAlumno = async (req, res) => {
  try {
    const datosAlumno = req.body;
    const nuevoAlumno = await crearAlumnoService(datosAlumno);
    return res.status(201).json(nuevoAlumno);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "El email ya se encuentra en uso" });
    }
    return res.status(400).json({ error: error.message });
  }
};

export const obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await obtenerAlumnosService();
    return res.json(alumnos);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ocurrió un error al obtener los alumnos " });
  }
};

export const actualizarAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const datosAlumno = req.body;
    const alumnoActualizado = await actualizarAlumnoService(id, datosAlumno);
    return res.status(200).json(alumnoActualizado);
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ error: "No se encontró el alumno con el ID proporcionado" });
    }
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "El email ya se encuentra en uso por otro alumno" });
    }
    return res.status(400).json({ error: error.message });
  }
};
export const eliminarAlumnoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarAlumnoService(id);
    return res.status(200).json({ message: "Alumno eliminado correctamente" });
  } catch (error) {
    return res
      .status(404)
      .json({ error: "No se encontró el alumno con el ID proporcionado" });
  }
  return res.status(500).json({ error: "Error interno del servidor" });
};
