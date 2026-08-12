import express from "express";
import cors from "cors";
import { prisma } from "./config/db.js";

import {
  obtenerAlumnos,
  crearAlumno,
  actualizarEmailAlumno,
  eliminarAlumno,
} from "./services/alumno.service.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/alumnos", async (req, res) => {
  try {
    const alumnos = await obtenerAlumnos(prisma);
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/alumnos", async (req, res) => {
  try {
    const nuevoAlumno = await crearAlumno(prisma, req.body);
    res.status(201).json(nuevoAlumno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API con Express corriendo en http://localhost:${PORT}`);
});
