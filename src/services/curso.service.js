import { prisma } from "../config/db.js";

export const crearCursoService = async (datosCurso) => {
  if (datosCurso.nombre === undefined || datosCurso.nombre === null) {
    throw new Error("El nombre del curso es obligatorio.");
  }
  if (datosCurso.cupo === undefined || datosCurso.cupo === null) {
    throw new Error("El cupo del curso es obligatorio.");
  }
  const cupoNumero = Number(datosCurso.cupo);
  if (isNaN(cupoNumero) || typeof datosCurso.cupo !== "number") {
    throw new Error("El cupo debe ser un número.");
  } else if (cupoNumero <= 0) {
    throw new Error("El cupo debe ser mayor a cero.");
  }

  const nuevoCurso = await prisma.curso.create({
    data: {
      ...datosCurso,
      nombre: datosCurso.nombre.toLowerCase().trim(),
      cupo: cupoNumero,
    },
  });
  return nuevoCurso;
};

export const obtenerCursosService = async () => {
  const cursos = await prisma.curso.findMany();
  return cursos;
};

export const detallesCursoService = async (nombreCurso) => {
  if (!nombreCurso)
    throw new Error("Ingresa el nombre del curso para poder obtener sus datos");

  const datosCurso = await prisma.curso.findFirst({
    where: {
      nombre: {
        equals: nombreCurso.trim(),
        mode: "insensitive",
      },
    },
    select: {
      nombre: true,
      cupo: true,

      profesor: { select: { id: true, nombre: true, email: true } },
      alumnos: {
        select: { nombre: true, apellido: true, email: true },
      },
    },
  });
  if (!datosCurso) throw new Error("No se encontro el curso con ese nombre.");
  return datosCurso;
};

export const actualizarCursoService = async (id, datosCurso) => {
  const cursoActualizado = await prisma.curso.update({
    where: { id: parseInt(id) },
    data: datosCurso,
  });
  return cursoActualizado;
};

export const eliminarCursoService = async (id) => {
  await prisma.curso.delete({
    where: { id: parseInt(id) },
  });
  return;
};
