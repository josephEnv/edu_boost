"use client"

import { user_return } from "@/types";
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function EstadisticasPage(){

    const session = useSession().data?.user as {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    } & user_return

    useEffect(() => {
        const fetcher = async () => {
            const data = await axios.get(`/api/estadisticas/${session.id_usuario}`)
            console.log(data.data)
        }
        fetcher()
    }, [])

    return (
        <div className="">
            Hola Perroas
        </div>
    )
}