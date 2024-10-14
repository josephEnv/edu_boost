"use client";

import axios from "axios";
import { getServerSession } from "next-auth/next";
import { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { MdLogout } from "react-icons/md";
import { signOut } from "next-auth/react";
import useServerSession from "@/hooks/useServerSession";

interface Preguntas {
  titulo: string;
  respuestas: string[];
  respuesta_correcta: number;
  editable: boolean;
}

export default function DocentePage() {
  const [preguntas, setPreguntas] = useState<Preguntas[]>([
    { titulo: "", respuestas: ["", "", ""], respuesta_correcta: 0, editable: true },
  ]);  

  // Agregar nueva pregunta
  const aggPregunta = () =>
    setPreguntas([
      ...preguntas.map((p) => ({ ...p, editable: false })), // Hacer que las preguntas anteriores no sean editables
      { titulo: "", respuestas: ["", "", ""], respuesta_correcta: 0, editable: true },
    ]);

  // Eliminar pregunta
  const eliminarPregunta = (index: number) =>
    setPreguntas(preguntas.filter((_, i) => i !== index));

  // Actualizar una pregunta
  const actualizarPregunta = (
    index: number,
    campo: keyof Preguntas,
    valor: string | number | string[]
  ) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index] = { ...nuevasPreguntas[index], [campo]: valor };
    setPreguntas(nuevasPreguntas);
  };

  // Agregar una nueva respuesta
  const aggRespuesta = (index: number) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index].respuestas.push("");
    setPreguntas(nuevasPreguntas);
  };

  // Eliminar una respuesta específica
  const eliminarRespuesta = (preguntaIndex: number, respuestaIndex: number) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[preguntaIndex].respuestas = nuevasPreguntas[
      preguntaIndex
    ].respuestas.filter((_, i) => i !== respuestaIndex);
    setPreguntas(nuevasPreguntas);
  };

  // Actualizar una respuesta específica
  const actualizarRespuesta = (
    preguntaIndex: number,
    respuestaIndex: number,
    valor: string
  ) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[preguntaIndex].respuestas[respuestaIndex] = valor;
    setPreguntas(nuevasPreguntas);
  };

  // Hacer una pregunta editable
  const editarPregunta = (index: number) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index].editable = true;
    setPreguntas(nuevasPreguntas);
  };

  // Validar y enviar los datos
  const guardarQuizz = async () => {
    const preguntasValidadas = preguntas.every((pregunta) => {
      return (
        pregunta.titulo.trim() !== "" &&
        pregunta.respuestas.every((respuesta) => respuesta.trim() !== "")
      );
    });

    if (!preguntasValidadas) {
      await axios.post("/api/quizz")
      return;
    }

  };

  return (
    <div className="relative py-16 px-60 flex flex-col gap-16">
      <div className="font-semibold text-3xl">
        <h1>Crea un Quizz</h1>
      </div>

      <div className="absolute top-0 right-0 p-5">
        <button onClick={async () => await signOut({ callbackUrl: "/" })} className="flex flex-row justify-center items-center gap-2 px-6 py-2 bg-red-400 rounded-md text-white hover">Cerrar Sesion <MdLogout /> </button>
      </div>

      <div className="flex flex-col gap-10 min-h-96 px-16">
        {preguntas.length > 0 ? (
          preguntas.map((item, index) => (
            <div key={index} className="border-b pb-4">
              {item.editable ? (
                <div className="flex flex-col gap-2 mb-4">
                  <span className="font-bold">Pregunta {index + 1}</span>
                  <textarea
                    className="w-[45rem] outline-neutral-400 rounded-lg p-2"
                    placeholder="Ingresa la pregunta..."
                    value={item.titulo}
                    onChange={(e) =>
                      actualizarPregunta(index, "titulo", e.target.value)
                    }
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2 mb-4">
                  <span className="font-bold">
                    Pregunta {index + 1}: {item.titulo}
                  </span>
                  <span>Respuesta correcta: {item.respuestas[item.respuesta_correcta]}</span>
                  <span>Cantidad de respuestas: {item.respuestas.length}</span>
                </div>
              )}

              {item.editable && (
                <div className="flex flex-col gap-2">
                  {item.respuestas.map((respuesta, rIndex) => (
                    <div key={rIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`pregunta-${index}`}
                        checked={item.respuesta_correcta === rIndex}
                        onChange={() =>
                          actualizarPregunta(index, "respuesta_correcta", rIndex)
                        }
                      />
                      <input
                        type="text"
                        className="w-full outline-neutral-400 rounded-lg p-2"
                        placeholder={`Respuesta ${rIndex + 1}`}
                        value={respuesta}
                        onChange={(e) =>
                          actualizarRespuesta(index, rIndex, e.target.value)
                        }
                      />
                      {/* Botón para eliminar respuesta cuando hay más de 3 respuestas */}
                      {item.respuestas.length > 3 && (
                        <button
                          onClick={() => eliminarRespuesta(index, rIndex)}
                          className="text-red-500 font-semibold">
                          Eliminar
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {item.editable && (
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => aggRespuesta(index)}
                    className="text-blue-500 font-semibold"
                  >
                    Agregar respuesta
                  </button>
                  <button
                    onClick={() => eliminarPregunta(index)}
                    className="text-red-500 font-semibold"
                  >
                    Eliminar pregunta
                  </button>
                </div>
              )}

              {!item.editable && (
                <button
                  onClick={() => editarPregunta(index)}
                  className="text-blue-500 font-semibold mt-2"
                >
                  Editar pregunta
                </button>
              )}
            </div>
          ))
        ) : (
          <h1>No hay preguntas</h1>
        )}
      </div>

      <div className="px-60 flex flex-col gap-2">
        <button
          onClick={aggPregunta}
          className="w-full p-2 rounded-md text-white font-semibold bg-blue-500"
        >
          Agregar pregunta
        </button>
        <button
          onClick={guardarQuizz}
          className="w-full p-2 rounded-md text-white font-semibold bg-green-500"
        >
          Guardar Quizz
        </button>
      </div>

      
    </div>
  );
}
