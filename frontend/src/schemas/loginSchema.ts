import { z } from "zod"

export const loginSchema = z.object({
  email: z.email("E-mail inválido!"),
  password: z.string().min(8, "Mínimo de 8 caracteres!").max(62, "Máximo de 62 caracteres!")
})
