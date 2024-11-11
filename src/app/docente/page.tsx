"use client";

import axios from "axios";
import { useState } from "react";
import { MdLogout } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { user_return } from "@/types";

export interface Pregunta {
  titulo: string;
  respuestas: Respuesta[];
  respuesta_correcta: number;
  tiempo_limite: number; // tiempo límite en segundos
  editable: boolean;
}

export interface Respuesta {
  texto: string;
}

export default function DocentePage() {
  const session = useSession().data?.user as {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } & user_return;

  const [preguntas, setPreguntas] = useState<Pregunta[]>([
    {
      titulo: "",
      respuestas: [{ texto: "" }, { texto: "" }, { texto: "" }],
      respuesta_correcta: 0,
      tiempo_limite: 0, // Valor inicial del tiempo límite
      editable: true,
    },
  ]);
  const [tituloQuizz, setTituloQuizz] = useState<string>("");

  // Agregar nueva pregunta
  const aggPregunta = () =>
    setPreguntas([
      ...preguntas.map((p) => ({ ...p, editable: false })), // Hacer que las preguntas anteriores no sean editables
      {
        titulo: "",
        respuestas: [{ texto: "" }, { texto: "" }, { texto: "" }],
        respuesta_correcta: 0,
        tiempo_limite: 0,
        editable: true,
      },
    ]);

  // Actualizar una pregunta específica
  const actualizarPregunta = (
    index: number,
    campo: keyof Pregunta,
    valor: string | number,
  ) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index] = { ...nuevasPreguntas[index], [campo]: valor };
    setPreguntas(nuevasPreguntas);
  };

  // Agregar una nueva respuesta a una pregunta
  const aggRespuesta = (preguntaIndex: number) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[preguntaIndex].respuestas.push({ texto: "" });
    setPreguntas(nuevasPreguntas);
  };

  // Eliminar una pregunta
  const eliminarPregunta = (preguntaIndex: number) => {
    setPreguntas(preguntas.filter((_, index) => index !== preguntaIndex));
  };

  // Actualizar una respuesta específica
  const actualizarRespuesta = (
    preguntaIndex: number,
    respuestaIndex: number,
    valor: string,
  ) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[preguntaIndex].respuestas[respuestaIndex].texto = valor;
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

  // Hacer una pregunta editable
  const editarPregunta = (index: number) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index].editable = true;
    setPreguntas(nuevasPreguntas);
  };

  // Guardar Quizz
  const guardarQuizz = async () => {
    const preguntasValidadas = preguntas.every((pregunta) => {
      return (
        pregunta.titulo.trim() !== "" &&
        pregunta.respuestas.every((respuesta) => respuesta.texto.trim() !== "")
      );
    });

    if (preguntasValidadas && tituloQuizz.trim() !== "") {
      try {
        const response = await axios.post("/api/quizz", {
          titulo: tituloQuizz,
          id_docente: session.id_usuario,
          preguntas,
        });

        alert(`El codigo de la reunion es: ${response.data.llave}`);

        // Limpiar el estado después de guardar exitosamente
        setTituloQuizz(""); // Reiniciar el título del quiz
        setPreguntas([
          {
            titulo: "",
            respuestas: [{ texto: "" }, { texto: "" }, { texto: "" }],
            respuesta_correcta: 0,
            tiempo_limite: 0,
            editable: true,
          },
        ]);

        console.log("Quizz guardado exitosamente");
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="relative py-16 px-60 flex flex-col gap-16 bg-white text-neutral-800">
      <div className="absolute top-0 right-0 p-5">
        <button
          onClick={async () => await signOut({ callbackUrl: "/" })}
          className="px-5 py-2 bg-red-400 text-white flex flex-row items-center gap-2 rounded-xl"
        >
          <span>Cerrar sesion</span>
          <MdLogout />
        </button>
      </div>

      <div className="font-semibold text-3xl">
        <h1>Crea un Quizz</h1>
      </div>

      <div>
        <label>Título del Quizz</label>
        <input
          className="w-full outline-neutral-400 rounded-lg p-2"
          value={tituloQuizz}
          onChange={(e) => setTituloQuizz(e.target.value)}
          placeholder="Ingresa el título del Quizz"
        />
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
                  <input
                    type="number"
                    className="w-32 outline-neutral-400 rounded-lg p-2 mt-2"
                    placeholder="Tiempo límite (s)"
                    value={item.tiempo_limite}
                    onChange={(e) =>
                      actualizarPregunta(
                        index,
                        "tiempo_limite",
                        Number(e.target.value),
                      )
                    }
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2 mb-4">
                  <span className="font-bold">
                    Pregunta {index + 1}: {item.titulo}
                  </span>
                  <span>
                    Respuesta correcta:{" "}
                    {item.respuestas[item.respuesta_correcta].texto}
                  </span>
                  <span>Cantidad de respuestas: {item.respuestas.length}</span>
                  <span>Tiempo límite: {item.tiempo_limite} segundos</span>
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
                          actualizarPregunta(
                            index,
                            "respuesta_correcta",
                            rIndex,
                          )
                        }
                      />
                      <input
                        type="text"
                        className="w-full outline-neutral-400 rounded-lg p-2"
                        placeholder={`Respuesta ${rIndex + 1}`}
                        value={respuesta.texto}
                        onChange={(e) =>
                          actualizarRespuesta(index, rIndex, e.target.value)
                        }
                      />
                      {item.respuestas.length > 3 && (
                        <button
                          onClick={() => eliminarRespuesta(index, rIndex)}
                          className="text-red-500 font-semibold"
                        >
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
          <h2>No has agregado preguntas</h2>
        )}

        <button
          onClick={aggPregunta}
          className="mt-4 text-blue-500 font-semibold"
        >
          Agregar Pregunta
        </button>
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={guardarQuizz}
          className="px-6 py-2 bg-green-400 text-white rounded-lg"
        >
          Guardar Quizz
        </button>
      </div>
    </div>
  );
}
