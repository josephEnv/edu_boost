"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { user_return } from "@/types";

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
      console.log(res);
      // Redirigir a la página del quizz
      router.push(`/quizz/${params.codigo}`);
    } catch (error) {
      console.error("Error al guardar los miembros:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold">Agregar Miembros al Grupo</h1>
      <div className="mt-4">
        {miembros.map((miembro, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={miembro}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Miembro ${index + 1}`}
              className="border rounded p-2"
            />
          </div>
        ))}
        <button
          onClick={handleAddMember}
          className="mt-2 bg-blue-500 text-white p-2 rounded"
        >
          Agregar Otro Miembro
        </button>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-500 text-white p-2 rounded"
      >
        Iniciar Quizz
      </button>
    </div>
  );
}