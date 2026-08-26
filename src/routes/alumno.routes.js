import Router from "express";
import {
  actualizarAlumno,
  crearAlumno,
  eliminarAlumnoPorId,
  obtenerAlumnos,
} from "../controllers/alumno.controller.js";

const router = Router();
router.post("/", crearAlumno);
router.get("/", obtenerAlumnos);
router.put("/:id", actualizarAlumno);
router.delete("/:id", eliminarAlumnoPorId);

export default router;
