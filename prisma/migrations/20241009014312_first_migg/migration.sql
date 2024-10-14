-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ESTUDIANTE', 'DOCENTE');

-- CreateEnum
CREATE TYPE "QuizzState" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" TEXT NOT NULL,
    "nombre_usuario" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "quizz" (
    "id_quizz" TEXT NOT NULL,
    "llave" TEXT NOT NULL,
    "id_docente" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "preguntas" TEXT[],
    "respuesta" INTEGER NOT NULL,
    "estado" "QuizzState" NOT NULL DEFAULT 'ACTIVO',

    CONSTRAINT "quizz_pkey" PRIMARY KEY ("id_quizz")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_id_usuario_key" ON "usuario"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_nombre_usuario_key" ON "usuario"("nombre_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "quizz_id_quizz_key" ON "quizz"("id_quizz");

-- CreateIndex
CREATE UNIQUE INDEX "quizz_llave_key" ON "quizz"("llave");

-- CreateIndex
CREATE UNIQUE INDEX "quizz_id_docente_key" ON "quizz"("id_docente");

-- AddForeignKey
ALTER TABLE "quizz" ADD CONSTRAINT "quizz_id_docente_fkey" FOREIGN KEY ("id_docente") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
