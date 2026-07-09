import { z } from "zod"

export const loginSchema = z.object({
  email: z.email("E-mail inválido!"),
  password: z.string().min(8, "Mínimo de 8 caracteres!").max(72, "Máximo de 72 caracteres!")
})
