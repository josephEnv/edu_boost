// /api/quizz/verify/route.ts
import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { llave } = await req.json();

  try {
    const quizzFound = await prisma.quizz.findUnique({ where: { llave } });
    return NextResponse.json(!!quizzFound);
  } catch (error) {
    console.error("Error al verificar quiz:", error);
    return NextResponse.json(false, { status: 500 });
  }
};
