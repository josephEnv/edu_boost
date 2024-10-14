"use client";

import { user_return } from "@/types";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import localFont from "next/font/local";
import Link from "next/link";

const crang_font = localFont({
  src: "./fonts/Crang.ttf",
  variable: "--font-crang",
  weight: "100 900",
});

export default function Home() {
  const { data: session, status } = useSession();
  const sessionData = session?.user as {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } & user_return
  // Verificamos si la sesión está cargando
  if (status === "loading") {
    return <div>Loading...</div>;  // Puedes personalizar el estado de carga
  }

  return (
    <div className="relative overflow-hidden h-screen flex justify-center items-center bg-gray-100">
      {/* Círculos animados */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-blue-300 rounded-full"
        animate={{ rotate: 360, x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* ...otros círculos animados */}

      {/* Contenido principal */}
      <motion.div
        className="flex justify-center items-center flex-col py-12 z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div id="title" className="text-center flex justify-center flex-col items-center z-10">
          <h1 className={`font-black text-4xl ${crang_font.className} tracking-[-0.07em]`}>
            Bienvenido a EduBoost
          </h1>
          <p className="mt-3 text-sm text-neutral-500">Explora y aprende</p>
        </div>

        <div id="access_button" className="mt-16 w-[20rem] z-10">
          <Link href={!session ? "/auth/login" : `/${sessionData.rol.toLowerCase()}`}>
            <motion.button
              className="w-full p-4 rounded-lg font-bold bg-blue-500 text-white text-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              Acceder
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
