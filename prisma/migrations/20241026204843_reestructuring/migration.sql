/*
  Warnings:

  - You are about to drop the `Estadistica` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Estadistica" DROP CONSTRAINT "Estadistica_id_quizz_fkey";

-- DropForeignKey
ALTER TABLE "Estadistica" DROP CONSTRAINT "Estadistica_id_usuario_fkey";

-- DropTable
DROP TABLE "Estadistica";

-- CreateTable
CREATE TABLE "Estadisticas" (
    "id_estadistica" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "puntaje" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "miembros" TEXT[],

    CONSTRAINT "Estadisticas_pkey" PRIMARY KEY ("id_estadistica")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estadisticas_id_estadistica_key" ON "Estadisticas"("id_estadistica");

-- AddForeignKey
ALTER TABLE "Estadisticas" ADD CONSTRAINT "Estadisticas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estadisticas" ADD CONSTRAINT "Estadisticas_codigo_fkey" FOREIGN KEY ("codigo") REFERENCES "Quizz"("llave") ON DELETE RESTRICT ON UPDATE CASCADE;
