import axios from "axios";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const {
      nextUrl: { pathname },
      nextauth: { token },
    } = req;

    // Redirigir si el usuario ya está autenticado e intenta acceder a rutas de autenticación
    if (pathname.startsWith("/auth") && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Proteger las rutas /docente y /estudiante según el rol del usuario
    if (
      pathname.startsWith("/docente") &&
      (!token || token.rol !== "DOCENTE")
    ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (
      pathname.startsWith("/estudiante") &&
      (!token || token.rol !== "ESTUDIANTE")
    ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Verificar si el usuario tiene estadísticas para el quiz en las rutas de quiz
    if (pathname.startsWith("/quizz/")) {
      const codigo = pathname.split("/").pop();

      const res = await axios.post(
        new URL("/api/estadisticas/check", req.url).toString(),
        { id_usuario: (token as any).id_usuario, codigo },
      );

      if (res.data.hasStatistics === false) {
        return NextResponse.redirect(
          new URL(`/estudiante/${codigo}/miembros`, req.url),
        ); // Redirigir a la página para agregar nombres si no tiene estadísticas
      }

      // Redirigir a resultados si el estado es "RESUELTO"
      if (res.data.state === "RESUELTO") {
        return NextResponse.redirect(
          new URL(`/estudiante/${codigo}/resultado`, req.url),
        );
      }
    }

    // Comprobación en la página de miembros para redirigir al quiz si ya tiene estadísticas
    if (pathname.startsWith("/estudiante/") && pathname.endsWith("/miembros")) {
      const codigo = pathname.split("/").pop();

      const res = await axios.post(
        new URL("/api/estadisticas/check", req.url).toString(),
        { id_usuario: (token as any).id_usuario, codigo },
      );

      if (res.data.hasStatistics === true) {
        // Redirigir al quiz si ya hay estadísticas
        return NextResponse.redirect(new URL(`/quizz/${codigo}`, req.url));
      }
    }

    // Verificar en la ruta del quizz si el estudiante tiene estadísticas antes de acceder
    if (pathname.startsWith("/estudiante/") && pathname.endsWith("/miembros")) {
      const codigo = pathname.split("/").pop();

      const res = await axios.post(
        new URL("/api/estadisticas/check", req.url).toString(),
        {
          id_usuario: (token as any).id_usuario,
          codigo,
        },
      );

      if (res.data.hasStatistics === true) {
        // Redirigir a la página del quizz si ya tiene estadísticas
        return NextResponse.redirect(new URL(`/quizz/${codigo}`, req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const {
          nextUrl: { pathname },
        } = req;

        // Permitir acceso a rutas de autenticación si el usuario NO está autenticado
        if (!token && pathname.startsWith("/auth")) {
          return true;
        }

        // Permitir acceso a otras rutas si el usuario está autenticado
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: [
    "/docente/:path*",
    "/estudiante/:path*",
    "/auth/login",
    "/auth/register",
    "/quizz/:path*", // Aplica el middleware a las rutas de quiz
    "/estudiante/:path*/miembros", // Aplica el middleware a la página de miembros
  ],
};
