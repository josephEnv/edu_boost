import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function POST(request: NextRequest) {
  const { codigo, respuestas, id_usuario } = await request.json();

  try {
    // Obtener el quizz y sus respuestas correctas
    const quizz = await prisma.quizz.findUnique({
      where: { llave: codigo },
      include: {
        preguntas: {
          include: {
            respuestas: true,
          },
        },
      },
    });

    if (!quizz) {
      return NextResponse.json(
        { error: "Quizz no encontrado" },
        { status: 404 },
      );
    }

    let puntaje = 0;

    // Calcular el puntaje
    quizz.preguntas.forEach((pregunta) => {
      const respuestaCorrectaId =
        pregunta.respuestas[pregunta.respuesta_correcta].id_respuesta; // Obtener el ID de la respuesta correcta
      if (respuestas[pregunta.id_pregunta] === respuestaCorrectaId) {
        puntaje++;
      }
    });

    // Verificar si ya existen estadísticas para el usuario y el quiz
    const estadisticasExistente = await prisma.estadisticas.findFirst({
      where: {
        id_usuario,
        codigo,
      },
    });

    if (estadisticasExistente) {
      // Si existe, actualizar
      await prisma.estadisticas.update({
        where: {
          id_estadistica: estadisticasExistente.id_estadistica, // Usar el ID existente para actualizar
        },
        data: {
          puntaje,
          quizz_state: "RESUELTO",
        },
      });
    } else {
      // Si no existe, crear una nueva estadística
      await prisma.estadisticas.create({
        data: {
          id_usuario,
          codigo,
          puntaje,
        },
      });
    }

    return NextResponse.json({
      message: "Respuestas enviadas con éxito",
      puntaje,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al enviar las respuestas" },
      { status: 500 },
    );
  }
}
