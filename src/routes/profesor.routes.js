import Router from "express";
import {
  actualizarProfesor,
  crearProfesor,
  eliminarProfesorPorId,
  obtenerProfesores,
} from "../controllers/profesor.controller.js";

const router = Router();
router.post("/", crearProfesor);
router.get("/", obtenerProfesores);
router.put("/:id", actualizarProfesor);
router.delete("/:id", eliminarProfesorPorId);
export default router;
