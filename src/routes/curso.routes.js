import Router from "express";
import {
  actualizarCurso,
  crearCurso,
  detallesCurso,
  eliminarCursoPorId,
  obtenerCursos,
} from "../controllers/curso.controller.js";

const router = Router();
router.post("/", crearCurso);
router.get("/", obtenerCursos);
router.get("/:nombre", detallesCurso);
router.put("/:id", actualizarCurso);
router.delete("/:id", eliminarCursoPorId);

export default router;
