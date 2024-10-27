import prisma from "@/libs/db";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { llave, miembros, id_usuario } = (await request.json()) as {
    llave: string;
    miembros: string[];
    id_usuario: string;
  };

  try {
    const estadisticas = await prisma.estadisticas.create({
      data: {
        codigo: llave,
        miembros: miembros,
        id_usuario,
      },
    });
    return NextResponse.json(estadisticas);
  } catch (error) {
    console.error("Error al guardar estadísticas:", error);
    return NextResponse.json(
      { error: "Error al guardar estadísticas" },
      { status: 500 },
    );
  }
}
