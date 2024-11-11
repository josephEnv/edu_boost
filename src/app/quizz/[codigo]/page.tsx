"use client";

import Button from "@/components/Button";
import { user_return } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pregunta } from "@prisma/client";

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
  const [timeRemaining, setTimeRemaining] = useState<number>(0); // Tiempo restante
  const [timerActive, setTimerActive] = useState<boolean>(false); // Estado del temporizador

  useEffect(() => {
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

  useEffect(() => {
    // Iniciar el temporizador cuando la pregunta cambia
    if (quizz && quizz.preguntas.length > 0) {
      const currentQuestion = quizz.preguntas[currentQuestionIndex] as Pregunta;
      setTimeRemaining(currentQuestion.duracion); // Establecer el tiempo límite de la pregunta
      setTimerActive(true);
    }
  }, [currentQuestionIndex, quizz]); // Solo reinicia cuando la pregunta cambie

  useEffect(() => {
    // Temporizador
    if (timerActive && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            handleNextQuestion(); // Avanzar automáticamente cuando el tiempo se agota
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Limpiar el intervalo al cambiar de pregunta
    }
  }, [timerActive, timeRemaining]);

  const handleResponseChange = (preguntaId: string, respuestaId: string) => {
    setResponses((prev) => ({
      ...prev,
      [preguntaId]: respuestaId,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === quizz.preguntas.length - 1) {
      handleSubmit(); // Enviar el cuestionario automáticamente si es la última pregunta
    } else {
      setCurrentQuestionIndex((prev) =>
        Math.min(prev + 1, quizz.preguntas.length - 1),
      );
      setTimerActive(false); // Detener el temporizador al cambiar de pregunta
    }
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
  const progress =
    currentQuestion.duracion > 0
      ? (timeRemaining / currentQuestion.duracion) * 100
      : 0;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white text-neutral-800 relative">
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

      {/* Barra de progreso al fondo */}
      <div className="absolute bottom-0 w-full bg-gray-200 h-2">
        <div
          className="h-full bg-blue-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="mt-4 flex flex-row gap-3">
        <Button
          onClick={
            currentQuestionIndex !== 0 ? handlePreviousQuestion : undefined
          }
          label="Anterior"
          color="gray"
        />
        <Button
          onClick={handleNextQuestion}
          label={
            currentQuestionIndex === quizz.preguntas.length - 1
              ? "Enviar"
              : "Siguiente"
          }
          color="blue"
        />
      </div>
    </div>
  );
}
