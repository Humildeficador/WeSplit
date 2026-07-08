import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, "Mínimo de 2 caracteres!").max(30, "Máximo de 30 caracteres!"),
  email: z.email("Insira um e-mail válido!"),
  password: z.string().min(8, "Mínimo de 8 caracteres!").max(62, "Máximo de 62 caracteres!"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
})
