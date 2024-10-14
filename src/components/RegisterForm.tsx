"use client";

import Link from "next/link"; 
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "./InputField";
import axios from "axios";
import { RegisterFormValues, registerSchema } from "@/schemas/register";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Importamos framer-motion
import { generateShapes } from "@/libs/generateShapes";

export const RegisterForm = () => {
  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await axios.post("/api/auth/register", data);
      methods.reset();
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      {/* Figuras geométricas dinámicas */}

      {/* Formulario */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 w-[20rem] z-10">
          <h1 className="text-2xl font-bold mb-6">Crea una cuenta</h1>

          <InputField 
            label="Nombre de usuario" 
            name="username" 
            type="text" 
            placeholder="Ingresa tu nombre de usuario" 
          />

          <div className="mb-4">
            <label htmlFor="accountType" className="block text-sm font-medium">
              Tipo de cuenta
            </label>
            <select
              id="accountType"
              {...methods.register("accountType")}
              className={`mt-1 block w-full px-3 py-2 border ${
                methods.formState.errors.accountType ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            >
              <option value="">Selecciona una opción</option>
              <option value="ESTUDIANTE">Estudiante</option>
              <option value="DOCENTE">Docente</option>
            </select>
            {methods.formState.errors.accountType && (
              <p className="text-red-500 text-sm mt-1">{methods.formState.errors.accountType?.message}</p>
            )}
          </div>

          <InputField 
            label="Contraseña" 
            name="password" 
            type="password" 
            placeholder="Contraseña" 
          />

          <InputField
            label="Confirma Contraseña"
            name="confirmPassword"
            type="password"
            placeholder="Confirma tu contraseña"
          />

          <button
            type="submit"
            className="w-full py-2 px-4 transition-all bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Registrarse
          </button>

          {/* Enlace a la página de inicio de sesión */}
          <p className="text-sm text-center mt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </form>
      </FormProvider>
    </div>
  );
};