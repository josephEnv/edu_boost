// /api/estadisticas/check/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";

export const POST = async (req: NextRequest) => {
  const { id_usuario, codigo } = await req.json();

  try {
    const estadistica = await prisma.estadisticas.findUnique({
      where: {
        id_usuario,
        codigo,
      },
      include: {
        quizz: true, // Incluye detalles del quiz
      },
    });

    if (!estadistica) {
      return NextResponse.json(
        { hasStatistics: false, state: null },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        hasStatistics: true,
        state: estadistica.quizz_state,
        puntaje: estadistica.puntaje,
        fecha: estadistica.fecha,
        titulo: estadistica.quizz.titulo, // Título del quiz
        miembros: estadistica.miembros, // Asegúrate de que esto sea correcto
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al verificar estadísticas" },
      { status: 500 },
    );
  }
};
