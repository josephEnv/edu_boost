"use client"

import useServerSession from "@/hooks/useServerSession";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import Link from "next/link";
import { useEffect } from "react";

const crang_font = localFont({
  src: "./fonts/crang.ttf",
  variable: "--font-crang",
  weight: "100 900"
});

export default function Home() {

  const session = useServerSession()

  return (
      <div className="relative overflow-hidden h-screen flex justify-center items-center bg-gray-100">
        {/* Círculos animados adicionales y suavizados */}
        <motion.div
          className="absolute top-10 left-10 w-40 h-40 bg-blue-300 rounded-full"
          animate={{ rotate: 360, x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-300 rounded-full"
          animate={{ rotate: -360, x: [0, -100, 100, 0], y: [0, 50, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-24 h-24 bg-red-300 rounded-full"
          animate={{ scale: [1, 1.5, 1], rotate: [0, 360, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Figuras adicionales con movimientos más suaves */}
        <motion.div
          className="absolute top-20 left-1/4 w-20 h-20 bg-purple-400 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.2, 1], x: [0, 60, -60, 0], y: [0, -30, 30, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-pink-300 rounded-full"
          animate={{ rotate: -360, x: [0, 80, -80, 0], y: [0, -40, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-28 h-28 bg-green-300 rounded-full"
          animate={{ rotate: -360, x: [0, -50, 50, 0], y: [0, -50, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

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
           
            <Link href={
              !session ? "/auth/login" : `/${session.rol.toLowerCase()}`
            }>
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
