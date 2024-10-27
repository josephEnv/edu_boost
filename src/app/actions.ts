import prisma from "@/libs/db";
import axios from "axios";

export const verifyQuizz = async (id: string) => {
  const data = await axios.post("/api/quizz/verify", { llave: id });
  return data.data as boolean;
};

export const getEstadistica = async ({
  quizzId,
  id_usuario,
}: {
  quizzId: string;
  id_usuario?: string;
}) => {
  const estadistica = await prisma.estadisticas.findFirst({
    where: {
      codigo: quizzId,
      id_usuario: id_usuario, // Asumiendo que el ID del usuario está en el token
    },
  });

  return estadistica;
};
