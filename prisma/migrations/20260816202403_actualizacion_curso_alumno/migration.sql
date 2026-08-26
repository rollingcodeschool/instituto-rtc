/*
  Warnings:

  - Made the column `profesorId` on table `Curso` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Curso" DROP CONSTRAINT "Curso_profesorId_fkey";

-- AlterTable
ALTER TABLE "Alumno" ADD COLUMN     "edad" INTEGER;

-- AlterTable
ALTER TABLE "Curso" ADD COLUMN     "cupo" INTEGER NOT NULL DEFAULT 20,
ALTER COLUMN "profesorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Profesor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
