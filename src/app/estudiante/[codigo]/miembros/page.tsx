"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { user_return } from "@/types";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function MiembrosPage({
  params,
}: {
  params: { codigo: string };
}) {
  const session = useSession().data?.user as {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } & user_return;

  const [miembros, setMiembros] = useState<string[]>([""]); // Iniciar con un campo vacío
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    const newMiembros = [...miembros];
    newMiembros[index] = value;
    setMiembros(newMiembros);
  };

  const handleAddMember = () => {
    setMiembros([...miembros, ""]); // Añadir un nuevo campo de entrada
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/estadisticas", {
        llave: params.codigo,
        id_usuario: session.id_usuario,
        miembros: miembros.filter((member) => member.trim() !== ""), // Solo enviar nombres no vacíos
      });

      const val = `/quizz/${params.codigo}`
      console.log(val)

      router.replace(val);
    } catch (error) {
      console.error("Error al guardar los miembros:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white text-neutral-800">
      <h1 className="text-3xl font-bold">Agregar Miembros al Grupo</h1>
      <div className="mt-4 text-center">
        {miembros.map((miembro, index) => (
          <div key={index} className="mb-2">
            <Input
              id="Miembro"
              size="large"
              value={miembro}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Miembro ${index + 1}`}
            />
          </div>
        ))}
        <Button onClick={handleAddMember} label={"Agregar otro miembro"} color={"blue"} />
        
      </div>
      <Button onClick={handleSubmit} label="Iniciar Quizz" color="green" />
    </div>
  );
}
