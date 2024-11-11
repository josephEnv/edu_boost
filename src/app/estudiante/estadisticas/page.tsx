"use client";

import { user_return } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import localFont from "next/font/local";

const crang_font = localFont({
  src: "../../fonts/Crang.ttf",
  variable: "--font-crang",
  weight: "100 900",
});

export default function EstadisticasPage() {
  const session = useSession().data?.user as {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } & user_return;

  const [estadisticas, setEstadisticas] = useState<any[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const data = await axios.get(`/api/estadisticas/${session.id_usuario}`);
      setEstadisticas(data.data);
    };
    fetcher();
  }, [session.id_usuario]);

  return (
    <div className={`bg-white min-h-screen text-neutral-800 p-5`}>
      <div className={`${crang_font.className} text-2xl mb-8`}>
        <h1>Estadísticas de juego</h1>
      </div>

      {estadisticas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {estadisticas.map((estadistica, index) => (
            <motion.div
              key={estadistica.id_estadistica}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-white border rounded-lg shadow-md p-6"
            >
              <div className="text-lg font-semibold">{`Código: ${estadistica.codigo}`}</div>
              <div className="text-sm text-gray-500">
                {new Date(estadistica.fecha).toLocaleString()}
              </div>

              <div className="mt-4">
                <div className="font-medium text-md">
                  Puntaje: {estadistica.puntaje}
                </div>
                <div className="text-sm text-gray-500">
                  Estado: {estadistica.quizz_state}
                </div>
              </div>

              <div className="mt-4">
                <div className="font-medium text-md">Miembros:</div>
                <ul className="text-sm text-gray-600">
                  {estadistica.miembros.map((miembro: string, idx: number) => (
                    <li key={idx}>{miembro}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl text-gray-500">
          No se encontraron estadísticas.
        </div>
      )}
    </div>
  );
}
