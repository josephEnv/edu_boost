"use client";

import { user_return } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuizzPage({ params }: { params: { codigo: string } }) {
  const session = useSession().data?.user as {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } & user_return;

  const router = useRouter();

  const [quizz, setQuizz] = useState<any>(null);
  const [error, setError] = useState("");
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    console.log(session);
    const fetchQuizz = async () => {
      try {
        const response = await axios.get(`/api/quizz/get/${params.codigo}`);
        setQuizz(response.data);
      } catch (err) {
        setError("No existe un quizz con ese código.");
      }
    };
    fetchQuizz();
  }, [params.codigo]);

  const handleResponseChange = (preguntaId: string, respuestaId: string) => {
    setResponses((prev) => ({
      ...prev,
      [preguntaId]: respuestaId,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) =>
      Math.min(prev + 1, quizz.preguntas.length - 1),
    );
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`/api/quizz/submit`, {
        codigo: params.codigo,
        respuestas: responses,
        id_usuario: session.id_usuario,
      });
      setIsSubmitted(true);
      router.push("/");
    } catch (err) {
      setError("Error al enviar las respuestas.");
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <h1 className="font-black text-3xl text-neutral-400">{error}</h1>
      </div>
    );
  }

  if (!quizz) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="font-black text-3xl text-neutral-400">
          Cargando quizz...
        </h1>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="font-black text-3xl text-neutral-400">
          ¡Gracias por participar!
        </h1>
      </div>
    );
  }

  const currentQuestion = quizz.preguntas[currentQuestionIndex];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl font-bold">{quizz.titulo}</h1>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">{currentQuestion.titulo}</h2>
        <ul className="ml-4">
          {currentQuestion.respuestas.map((respuesta: any) => (
            <li key={respuesta.id_respuesta} className="text-lg">
              <label>
                <input
                  type="radio"
                  name={currentQuestion.id_pregunta}
                  value={respuesta.id_respuesta}
                  onChange={() =>
                    handleResponseChange(
                      currentQuestion.id_pregunta,
                      respuesta.id_respuesta,
                    )
                  }
                />
                {respuesta.texto}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <button
          onClick={handlePreviousQuestion}
          className="p-2 bg-gray-400 text-white rounded mr-2"
          disabled={currentQuestionIndex === 0}
        >
          Anterior
        </button>
        <button
          onClick={
            currentQuestionIndex === quizz.preguntas.length - 1
              ? handleSubmit
              : handleNextQuestion
          }
          className="p-2 bg-blue-500 text-white rounded"
        >
          {currentQuestionIndex === quizz.preguntas.length - 1
            ? "Enviar"
            : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
