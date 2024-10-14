import { authOptions } from "@/libs/authOptions"
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET }
export { handler as POST }