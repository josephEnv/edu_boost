/*
  Warnings:

  - A unique constraint covering the columns `[id_usuario]` on the table `Estadisticas` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Estadisticas_codigo_key";

-- CreateIndex
CREATE UNIQUE INDEX "Estadisticas_id_usuario_key" ON "Estadisticas"("id_usuario");
