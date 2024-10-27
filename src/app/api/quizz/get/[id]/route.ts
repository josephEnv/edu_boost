import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    // Obtén el quizz por su id_quizz, junto con las preguntas y respuestas relacionadas
    const quizz = await prisma.quizz.findUnique({
      where: { llave: id },
      include: {
        preguntas: {
          include: {
            respuestas: true,
          },
        },
        docente: true, // Incluye los datos del docente
      },
    });

    if (!quizz) {
      return NextResponse.json(
        { error: "Quizz no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(quizz);
  } catch (error) {
    console.error("Error al obtener el quizz:", error);
    return NextResponse.json(
      { error: "Error al obtener el quizz" },
      { status: 500 },
    );
  }
}
