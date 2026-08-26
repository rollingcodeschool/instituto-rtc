import { Router } from "express";
import {
  desinscribirAlumno,
  inscribirAlumno,
} from "../controllers/instituto.controller.js";

const router = Router();
router.post("/cursos/:id/alumnos", inscribirAlumno);
router.delete("/cursos/:id/alumnos", desinscribirAlumno);
export default router;
