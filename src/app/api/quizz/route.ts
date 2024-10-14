import { generarNumeroAleatorio } from "@/libs/functions";
import { PrismaClient, quizz } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
    const body = await request.json() as quizz;
    const newQuizz = await prisma.quizz.create({ data: {
        ...body,
        llave: `${generarNumeroAleatorio()}`
    } })

    return NextResponse.json(newQuizz, { status: 200 })
}