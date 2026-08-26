import { prisma } from "../config/db.js";

export const crearProfesorService = async (datosProfesor) => {
  if (
    datosProfesor.nombre.trim().toLowerCase() ===
    datosProfesor.apellido.trim().toLowerCase()
  ) {
    throw new Error(
      "El nombre y el apellido del profesor no pueden ser idénticos",
    );
  }
  const nuevoProfesor = await prisma.profesor.create({
    data: datosProfesor,
  });

  return nuevoProfesor;
};

export const obtenerProfesoresService = async () => {
  const profesoresConsultados = await prisma.profesor.findMany();
  return profesoresConsultados;
};

export const actualizarProfesorService = async (id, datosProfesor) => {
  const profesorActualizado = await prisma.profesor.update({
    where: { id: parseInt(id) },
    data: datosProfesor,
  });
  return profesorActualizado;
};

export const eliminarProfesorService = async (id) => {
  const profesorEliminado = await prisma.profesor.delete({
    where: { id: parseInt(id) },
  });
  return profesorEliminado;
};
