-- DropForeignKey
ALTER TABLE "Curso" DROP CONSTRAINT "Curso_profesorId_fkey";

-- AlterTable
ALTER TABLE "Curso" ALTER COLUMN "profesorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Profesor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
