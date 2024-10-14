"use client"

import { verifyQuizz } from "@/app/actions"
import { useEffect, useState } from "react"

export default function QuizzPage({ params }: { params: { codigo: string } }) {

    const [quizzExists, setQuizzExists] = useState(false)

    useEffect(() => {
        const fetcher = async () => setQuizzExists(await verifyQuizz(params.codigo))
        fetcher()
    }, [])

    if(!quizzExists) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white">
                <h1 className="font-black text-3xl text-neutral-400">No existe un quizz con ese codigo</h1>
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            {params.codigo}
        </div>
    )
}