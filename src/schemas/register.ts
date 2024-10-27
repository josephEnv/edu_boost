import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(5, "El nombre de usuario debe tener al menos 5 caracteres"),
    accountType: z.enum(["ESTUDIANTE", "DOCENTE"], {
      errorMap: () => ({ message: "Selecciona un tipo de cuenta válido" }),
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
