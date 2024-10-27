-- AlterTable
ALTER TABLE "Estadisticas" ALTER COLUMN "puntaje" DROP NOT NULL,
ALTER COLUMN "miembros" SET DEFAULT ARRAY[]::TEXT[];
