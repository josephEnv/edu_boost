/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Estadisticas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Estadisticas_codigo_key" ON "Estadisticas"("codigo");
