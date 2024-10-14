import axios from "axios"

export const verifyQuizz = async (id: string) => {
    const data = await axios.post("/api/quizz/verify", { llave: id })
    return data.data as boolean
}