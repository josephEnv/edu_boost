import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Pregunta } from "@/app/docente/page"; // Asegúrate de que esto importe correctamente la interfaz
import { generarNumeroAleatorio } from "@/libs/functions";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  const body = (await request.json()) as {
    titulo: string;
    id_docente: string;
    preguntas: Pregunta[];
  };

  try {
    // Crear el quizz
    const newQuizz = await prisma.quizz.create({
      data: {
        llave: `${generarNumeroAleatorio()}`, // Llave generada aleatoriamente
        titulo: body.titulo,
        id_docente: body.id_docente, // Necesitas el ID del docente autenticado aquí
        preguntas: {
          create: body.preguntas.map((pregunta) => ({
            duracion: pregunta.tiempo_limite,
            titulo: pregunta.titulo,
            respuestas: {
              create: pregunta.respuestas.map((respuesta) => ({
                texto: respuesta.texto,
              })),
            },
            respuesta_correcta: pregunta.respuesta_correcta,
          })),
        },
      },
      include: {
        preguntas: {
          include: {
            respuestas: true,
          },
        },
      },
    });

    return NextResponse.json(newQuizz, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating quizz" },
      { status: 500 },
    );
  }
};
