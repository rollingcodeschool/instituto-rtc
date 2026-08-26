import { prisma } from "../config/db.js";

export const crearAlumnoService = async (datosAlumno) => {
  if (
    datosAlumno.nombre.trim().toLowerCase() ===
    datosAlumno.apellido.trim().toLowerCase()
  ) {
    throw new Error(
      "El nombre y el apellido del alumno no pueden ser idénticos",
    );
  }
  const nuevoAlumno = await prisma.alumno.create({
    data: datosAlumno,
  });
  return nuevoAlumno;
};

export const obtenerAlumnosService = async () => {
  const alumnosConsultados = await prisma.alumno.findMany();
  return alumnosConsultados;
};

export const actualizarAlumnoService = async (id, datosAlumno) => {
  const alumnoActualizado = await prisma.alumno.update({
    where: { id: parseInt(id) },
    data: datosAlumno,
  });
  return alumnoActualizado;
};

export const eliminarAlumnoService = async (id) => {
  const alumnoEliminado = await prisma.alumno.delete({
    where: { id: parseInt(id) },
  });
  return alumnoEliminado;
};
