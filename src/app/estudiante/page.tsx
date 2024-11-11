"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { MdLogout } from "react-icons/md";
import { FcStatistics } from "react-icons/fc";

export default function EstudiantePage() {
  const [codigo, setCodigo] = useState("");

  return (
    <div className="flex relative justify-center items-center min-h-screen bg-white text-neutral-800">
      <div className="absolute top-0 right-0 p-5 flex flex-col gap-4">
        <button
          onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
          className="px-4 py-2 bg-red-400 text-white rounded-lg flex flex-row gap-3 items-center"
        >
          <span>Cerrar sesion</span>
          <MdLogout />
        </button>
        <Link href="/estudiante/estadisticas">
          <Button radius="md" label="Ver estadisticas" color="green" />
        </Link>
      </div>
      <div className="w-[30rem] px-5 py-4 min-h-[10rem] flex flex-col gap-2 justify-center items-center shadow-md rounded-xl shadow-neutral-400">
        <h1 className="font-black text-5xl mb-2">CODIGO</h1>
        <Input
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="codigo..."
          size="large"
          id="codigo"
        />
        <Link href={`/quizz/${codigo}`}>
          <Button label="Ingresar" color="blue" />
        </Link>
      </div>
    </div>
  );
}
