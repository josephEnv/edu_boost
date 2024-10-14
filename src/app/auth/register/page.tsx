"use client"

import { RegisterForm } from "@/components/RegisterForm";
import { generateShapes } from "@/libs/generateShapes";

export default function RegisterPage() {
    return (
        <div className="flex justify-center items-center min-h-screen relative overflow-hidden">
            <RegisterForm />
        </div>
    )
}