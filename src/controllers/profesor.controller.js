import {
  actualizarProfesorService,
  crearProfesorService,
  eliminarProfesorService,
  obtenerProfesoresService,
} from "../services/profesor.service.js";

export const crearProfesor = async (req, res) => {
  try {
    const datosProfesor = req.body;
    const nuevoProfesor = await crearProfesorService(datosProfesor);

    return res.status(201).json(nuevoProfesor);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "El email ya se encuentra en uso" });
    }
    return res.status(400).json({ error: error.message });
  }
};

export const obtenerProfesores = async (req, res) => {
  try {
    const profesores = await obtenerProfesoresService();
    return res.json(profesores);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los profesores" });
  }
};

export const actualizarProfesor = async (req, res) => {
  try {
    const { id } = req.params;
    const datosProfesor = req.body;
    const profesorActualizado = await actualizarProfesorService(
      id,
      datosProfesor,
    );
    return res.json({
      profesor: profesorActualizado,
      message: "Profesor actualizado correctamente",
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ error: "No se encontró el profesor con el ID proporcionado" });
    }
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "El email ya se encuentra en uso por otro profesor" });
    }
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const eliminarProfesorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarProfesorService(id);
    return res
      .status(200)
      .json({ message: "Profesor eliminado correctamente" });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ error: "No se encontró el profesor con el ID proporcionado" });
    }
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
