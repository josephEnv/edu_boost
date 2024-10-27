import { AuthOptions, RequestInternal } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }: { token: any; user: any }) => {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Si hay un token, propagamos los datos del token al objeto de sesión
      if (token) {
        // Usamos el spread operator para añadir todos los datos del token al usuario de la sesión
        session.user = {
          ...session.user, // Mantiene cualquier campo previo que haya en session.user
          ...token, // Propaga todos los campos que estén en el token
        };
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "username" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">,
      ) {
        const userFound = await prisma.usuario.findUnique({
          where: {
            nombre_usuario: credentials?.username,
          },
        });

        if (!userFound)
          throw new Error(
            JSON.stringify({
              field: "username",
              message: "usuario no encontrado",
            }),
          );
        if (userFound.clave !== credentials?.password)
          throw new Error(
            JSON.stringify({
              field: "password",
              message: "la clave no es correcta",
            }),
          );

        return {
          id: userFound.id_usuario,
          ...userFound,
        };
      },
    }),
  ],
};
