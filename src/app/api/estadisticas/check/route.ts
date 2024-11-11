// /api/estadisticas/check/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";

export const POST = async (req: NextRequest) => {
  const { id_usuario, codigo } = await req.json();

  try {
    const estadistica = await prisma.estadisticas.findFirst({
      where: {
        id_usuario,
        quizz: { llave: codigo }, // Verificación basada en el código del quiz
      },
      include: {
        quizz: { select: { titulo: true } }, // Incluye el título del quiz
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
        titulo: estadistica.quizz.titulo,
        miembros: estadistica.miembros,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error al verificar estadísticas:", error);
    return NextResponse.json(
      { error: "Error al verificar estadísticas" },
      { status: 500 },
    );
  }
};
