import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { llave } = await req.json();
  const quizzFound = await prisma.quizz.findUnique({ where: { llave } });
  if (!quizzFound) return NextResponse.json(false);
  return NextResponse.json(true);
};
