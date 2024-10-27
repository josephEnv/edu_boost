-- CreateEnum
CREATE TYPE "UserQuizzState" AS ENUM ('RESUELTO', 'NO_RESUELTO');

-- AlterTable
ALTER TABLE "Estadisticas" ADD COLUMN     "quizz_state" "UserQuizzState" NOT NULL DEFAULT 'NO_RESUELTO';
