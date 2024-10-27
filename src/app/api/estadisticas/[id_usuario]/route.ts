import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id_usuario: string } }) {
  const estadisticas = await prisma.estadisticas.findMany({
    where: {
      id_usuario: params.id_usuario,
    }
  })
  if(estadisticas.length === 0) return NextResponse.json({ message: "No existen registros" }, { status: 404 })

  return NextResponse.json(estadisticas, { status: 200 })
}
