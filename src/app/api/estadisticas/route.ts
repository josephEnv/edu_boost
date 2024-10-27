import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { llave, miembros, id_usuario } = (await request.json()) as {
    llave: string;
    miembros: string[];
    id_usuario: string;
  };

  console.log(llave)

  try {
    // Verificar si el `llave` existe en la tabla `Quizz`
    const quizExists = await prisma.quizz.findUnique({
      where: { llave },
    });


    if (!quizExists) {
      return NextResponse.json(
        { error: "El código de quiz no existe." },
        { status: 400 }
      );
    }

    // Crear entrada en Estadisticas si el código existe
    const estadisticas = await prisma.estadisticas.create({
      data: {
        codigo: llave,
        miembros,
        id_usuario,
      },
    });

    return NextResponse.json(estadisticas);
  } catch (error) {
    console.error("Error al guardar estadísticas:", error);
    return NextResponse.json(
      { error: "Error al guardar estadísticas" },
      { status: 500 }
    );
  }
}
