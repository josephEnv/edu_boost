"use client";

// /app/estudiante/[codigo]/resultado/page.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Definición de tipos
interface Estadistica {
  titulo: string;
  puntaje: number;
  state: string; // Puedes ajustar este tipo según tus enums
  fecha: string;
  miembros: string[];
}

const ResultPage = ({ params }: { params: { codigo: string } }) => {
  const [estadistica, setEstadistica] = useState<Estadistica | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const res = await fetch(`/api/estadisticas/check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ codigo: params.codigo }),
        });

        if (!res.ok) {
          throw new Error("Error al obtener estadísticas");
        }

        const data: Estadistica = await res.json();
        console.log(data);
        setEstadistica(data);
      } catch (err) {
        setError((err as Error).message); // Asegúrate de que sea un Error
      } finally {
        setLoading(false);
      }
    };

    if (params.codigo) {
      fetchEstadisticas();
    }
  }, [params.codigo]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (!estadistica) {
    return (
      <div className="text-center">
        No se encontraron estadísticas para este quiz.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-neutral-800">
      <h1 className="text-2xl font-bold mb-4">Resultados del Quiz</h1>
      <div className="bg-gray-100 shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">
          Título del Quiz: {estadistica.titulo}
        </h2>
        <p className="mb-2">
          <strong>Puntuación:</strong> {estadistica.puntaje}
        </p>
        <p className="mb-2">
          <strong>Estado:</strong> {estadistica.state}
        </p>
        <p className="mb-4">
          <strong>Fecha:</strong>{" "}
          {new Date(estadistica.fecha).toLocaleDateString()}
        </p>
        <h3 className="text-lg font-semibold mb-2">Miembros:</h3>
        <ul className="list-disc pl-5">
          {estadistica.miembros.map((miembro, index) => (
            <li key={index} className="mb-1">
              {miembro}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultPage;
