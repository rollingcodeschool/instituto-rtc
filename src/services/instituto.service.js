import { prisma } from "../config/db.js";

export const inscribirAlumnoService = async (cursoId, alumnoId) => {
  return await prisma.$transaction(async (tx) => {
    const alumnoExistente = await tx.alumno.findUnique({
      where: { id: parseInt(alumnoId) },
    });

    if (!alumnoExistente) {
      throw new Error("El alumno no esta registrado en el insttuto");
    }

    const capacidadCurso = await tx.curso.findUnique({
      where: { id: parseInt(cursoId) },
      include: {
        alumnos: {
          where: { id: parseInt(alumnoId) },
          select: { id: true, nombre: true, apellido: true },
        },
      },
    });

    if (!capacidadCurso) throw new Error("Este curso no existe");
    if (capacidadCurso.alumnos.length > 0)
      throw new Error(
        `El alumno ${alumnoExistente.nombre} ${alumnoExistente.apellido} ya se encentra incripto en este curso`,
      );
    if (capacidadCurso.cupo <= 0)
      throw new Error("El cupo de este curso ya está completo");

    const cursoActualizado = await tx.curso.update({
      where: { id: parseInt(cursoId) },
      data: {
        alumnos: {
          connect: { id: parseInt(alumnoId) },
        },
        cupo: {
          decrement: 1,
        },
      },
      select: {
        nombre: true,
        cupo: true,
        profesor: { select: { nombre: true, apellido: true } },
        alumnos: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            email: true,
          },
        },
      },
    });
    return cursoActualizado;
  });
};

export const desinscribirAlumnoService = async (cursoId, alumnoId) => {
  return await prisma.$transaction(async (tx) => {
    const capacidadCurso = await tx.curso.findUnique({
      where: { id: parseInt(cursoId) },
      include: {
        alumnos: {
          where: { id: parseInt(alumnoId) },
          select: { id: true, nombre: true, apellido: true, email: true },
        },
      },
    });

    if (!capacidadCurso) {
      throw new Error("El curso no existe ");
    }
    if (capacidadCurso.alumnos.length === 0) {
      throw new Error("El alumno que intenstas desisncribir, no existe");
    }

    const cursoActualizado = await tx.curso.update({
      where: { id: parseInt(cursoId) },
      data: {
        alumnos: {
          disconnect: { id: parseInt(alumnoId) },
        },
        cupo: {
          increment: 1,
        },
      },
      select: {
        id: true,
        nombre: true,
        cupo: true,
        alumnos: {
          select: { id: true, nombre: true, apellido: true },
        },
      },
    });
    return cursoActualizado;
  });
};
