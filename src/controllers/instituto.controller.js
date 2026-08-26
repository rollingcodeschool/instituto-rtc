import {
  desinscribirAlumnoService,
  inscribirAlumnoService,
} from "../services/instituto.service.js";

export const inscribirAlumno = async (req, res) => {
  try {
    const { id: cursoId } = req.params;
    const { alumnoId } = req.body;
    const alumnoInscripto = await inscribirAlumnoService(cursoId, alumnoId);
    return res.status(200).json(alumnoInscripto);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const desinscribirAlumno = async (req, res) => {
  try {
    const { id: cursoId } = req.params;
    const { alumnoId } = req.body;
    const resultado = await desinscribirAlumnoService(cursoId, alumnoId);
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
