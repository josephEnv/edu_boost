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
      return NextResponse.redirect(new URL("/", req.url)); // O redirige a /docente si corresponde
    }

    // Proteger las rutas /docente y /estudiante
    if (pathname.startsWith("/docente") && (!token || token.rol !== "DOCENTE")) {
      return NextResponse.redirect(new URL("/auth/login", req.url)); // Redirigir a login si no es DOCENTE o no autenticado
    }

    if (pathname.startsWith("/estudiante") && (!token || token.rol !== "ESTUDIANTE")) {
      return NextResponse.redirect(new URL("/auth/login", req.url)); // Redirigir a login si no es ESTUDIANTE o no autenticado
    }
  },
  {
    callbacks: {
      // El callback authorized define cuándo se permite el acceso
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
  }
);

export const config = {
  matcher: [
    "/docente/:path*",  // Protege todas las rutas bajo /docente
    "/estudiante/:path*",  // Protege todas las rutas bajo /estudiante
    "/auth/login",  // Aplica el middleware en /auth/login
    "/auth/register",  // Aplica el middleware en /auth/register
  ],
};
