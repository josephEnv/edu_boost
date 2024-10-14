import withAuth from "next-auth/middleware"
import { user_return } from "./types"
import { JWT } from "next-auth/jwt"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token as user_return & JWT
        if(req.nextUrl.pathname.startsWith("/docente") && token.rol !== "DOCENTE") {
            return NextResponse.redirect(new URL("/estudiante", req.url))
        }
        if(req.nextUrl.pathname.startsWith("/estudiante") && token.rol !== "ESTUDIANTE") {
            return NextResponse.redirect(new URL("/docente", req.url))
        }
        if(req.nextUrl.pathname.startsWith("/auth") && token !== undefined) {
            return NextResponse.redirect(new URL("/estudiante", req.url))
        }
    }
)

export const config = { matcher: ["/docente", "/estudiante", "/auth/:path*"] }