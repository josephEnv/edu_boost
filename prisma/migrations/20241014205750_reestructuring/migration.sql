/*
  Warnings:

  - You are about to drop the column `respuesta` on the `quizz` table. All the data in the column will be lost.
  - Added the required column `respuesta_correcta` to the `quizz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quizz" DROP COLUMN "respuesta",
ADD COLUMN     "respuesta_correcta" INTEGER NOT NULL,
ADD COLUMN     "respuestas" TEXT[];
