import prisma from "@/libs/db"
import { param } from "framer-motion/client"
import NextAuth, { Awaitable, NextAuthOptions, RequestInternal, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { NextResponse } from "next/server"

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/auth/login",
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        jwt: ({token, user}) => {
            if(user){
                return {...token, ...user}
            }
            return token
        },
    },
    providers: [Credentials({
        name: "Credentials",
        credentials: {
            username: { label: "username", type: "text", placeholder: "username" },
            password: { label: "password", type: "password" }
        },
        async authorize (credentials: Record<"username" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) {
            const userFound = await  prisma.usuario.findUnique({
                where: {
                    nombre_usuario: credentials?.username
                }
            })
            
            if(!userFound) throw new Error(JSON.stringify({ field: "username", message: "usuario no encontrado" }))
            if(userFound.clave !== credentials?.password) throw new Error(JSON.stringify({ field: "password", message: "la clave no es correcta" }))
            
            return {
                id: userFound.id_usuario,
                ...userFound
            }
        }
    })]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }