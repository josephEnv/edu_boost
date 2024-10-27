-- CreateTable
CREATE TABLE "Estadistica" (
    "id_estadistica" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "id_quizz" TEXT NOT NULL,
    "respuestas" JSONB NOT NULL,
    "puntaje" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Estadistica_pkey" PRIMARY KEY ("id_estadistica")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estadistica_id_estadistica_key" ON "Estadistica"("id_estadistica");

-- AddForeignKey
ALTER TABLE "Estadistica" ADD CONSTRAINT "Estadistica_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estadistica" ADD CONSTRAINT "Estadistica_id_quizz_fkey" FOREIGN KEY ("id_quizz") REFERENCES "Quizz"("id_quizz") ON DELETE RESTRICT ON UPDATE CASCADE;
