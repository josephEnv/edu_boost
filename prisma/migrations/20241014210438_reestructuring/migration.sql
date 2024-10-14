/*
  Warnings:

  - You are about to drop the `quizz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "quizz" DROP CONSTRAINT "quizz_id_docente_fkey";

-- DropTable
DROP TABLE "quizz";

-- DropTable
DROP TABLE "usuario";

-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" TEXT NOT NULL,
    "nombre_usuario" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Quizz" (
    "id_quizz" TEXT NOT NULL,
    "llave" TEXT NOT NULL,
    "id_docente" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "estado" "QuizzState" NOT NULL DEFAULT 'ACTIVO',

    CONSTRAINT "Quizz_pkey" PRIMARY KEY ("id_quizz")
);

-- CreateTable
CREATE TABLE "Pregunta" (
    "id_pregunta" TEXT NOT NULL,
    "id_quizz" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "respuesta_correcta" INTEGER NOT NULL,

    CONSTRAINT "Pregunta_pkey" PRIMARY KEY ("id_pregunta")
);

-- CreateTable
CREATE TABLE "Respuesta" (
    "id_respuesta" TEXT NOT NULL,
    "id_pregunta" TEXT NOT NULL,
    "texto" TEXT NOT NULL,

    CONSTRAINT "Respuesta_pkey" PRIMARY KEY ("id_respuesta")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_id_usuario_key" ON "Usuario"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nombre_usuario_key" ON "Usuario"("nombre_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Quizz_id_quizz_key" ON "Quizz"("id_quizz");

-- CreateIndex
CREATE UNIQUE INDEX "Quizz_llave_key" ON "Quizz"("llave");

-- CreateIndex
CREATE UNIQUE INDEX "Pregunta_id_pregunta_key" ON "Pregunta"("id_pregunta");

-- CreateIndex
CREATE UNIQUE INDEX "Respuesta_id_respuesta_key" ON "Respuesta"("id_respuesta");

-- AddForeignKey
ALTER TABLE "Quizz" ADD CONSTRAINT "Quizz_id_docente_fkey" FOREIGN KEY ("id_docente") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_id_quizz_fkey" FOREIGN KEY ("id_quizz") REFERENCES "Quizz"("id_quizz") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_id_pregunta_fkey" FOREIGN KEY ("id_pregunta") REFERENCES "Pregunta"("id_pregunta") ON DELETE RESTRICT ON UPDATE CASCADE;
