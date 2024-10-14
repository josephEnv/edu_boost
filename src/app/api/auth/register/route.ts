import prisma from "@/libs/db";
import { RegisterFormValues, registerSchema } from "@/schemas/register";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // Validar con Zod en el backend
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Datos inválidos", issues: result.error.format() }, { status: 400 });
    }

    const validatedData = result.data as RegisterFormValues;

    // Verifica si el nombre de usuario ya existe
    const existingUser = await prisma.usuario.findUnique({
      where: { nombre_usuario: validatedData.username },
    });

    if (existingUser) {
      return NextResponse.json({ error: "El nombre de usuario ya está en uso" }, { status: 409 });
    }

    const newUser = await prisma.usuario.create({
      data: {
        nombre_usuario: validatedData.username,
        clave: validatedData.password, // Debes encriptar la contraseña aquí
        rol: validatedData.accountType,
      },
    });

    return NextResponse.json({ user: newUser, message: "Usuario creado con éxito" }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Error interno del servidor", details: error }, { status: 500 });
  }
};
