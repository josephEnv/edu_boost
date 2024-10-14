"use client";

import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "./InputField";
import { LoginFormValues, loginSchema } from "@/schemas/login";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import useServerSession from "@/hooks/useServerSession";


// Formulario de Login
export const LoginForm = () => {
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter()
  
  const [globalError, setGlobalError] = useState<string | null>(null); // Para manejar errores globales



  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });
      

      if (res?.error) {
        // Parsear el error devuelto por NextAuth
        const error = JSON.parse(res.error); // `res.error` es un string, lo parseamos a objeto
        if (error.field && error.message) {
          methods.setError(error.field, { type: "manual", message: error.message });
        } else {
          setGlobalError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
        }
      } else {
        router.push("/docente")
      }
    } catch (e) {
      setGlobalError("Error inesperado al iniciar sesión.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 w-[20rem] z-10">
          <h1 className="text-2xl font-bold mb-6">Inicia Sesión</h1>

          {/* Mostrar error global si lo hay */}
          {globalError && <p className="text-red-500 text-sm">{globalError}</p>}

          <InputField
            label="Nombre de usuario"
            name="username"
            type="text"
            placeholder="Ingresa tu nombre de usuario"
          />

          <InputField
            label="Contraseña"
            name="password"
            type="password"
            placeholder="Contraseña"
          />

          <button
            type="submit"
            className="w-full transition-all py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Inicia Sesión
          </button>

          {/* Enlace a la página de registro */}
          <p className="text-sm text-center mt-4">
            ¿No tienes una cuenta?{" "}
            <Link href="/auth/register" className="text-blue-500 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </form>
      </FormProvider>
    </div>
  );
};