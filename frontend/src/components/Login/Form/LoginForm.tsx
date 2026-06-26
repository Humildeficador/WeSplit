import type z from "zod"
import { loginSchema } from "../../../schemas/loginSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./Input"
import { Lock, Mail } from "lucide-react"
import { useState } from "react"
import { api } from "../../../api"
import { useAuth } from "../../../hooks/useAuth"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema)
  })

  const [loginError, setLoginError] = useState<string | null>(null)
  const { login } = useAuth()
  const navigate = useNavigate()


  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const response = await api.post('/auth', data)
      login(response.data.token)
      navigate('/activity')
      reset()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setLoginError(err.response?.data?.message ?? "Erro ao realizar o login")
      }
    }
  }

  return (
    <div className="bg-[#11151a] rounded-lg w-110 flex flex-col py-6 px-13 border border-hairline">
      <div>
        <h1 className="mt-7 font-semibold text-2xl">Bem-vindo de volta!</h1>
        <p className="text-white/50 text-sm mt-2">Faça login para acessar sua conta</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          icon={Mail}
          error={errors.email?.message}
          registration={register('email')}
        />

        <Input
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          icon={Lock}
          error={errors.password?.message}
          registration={register('password')}
        />

        <button
          type="submit"
          className="
        bg-blue-400 w-full rounded-lg py-2 mt-15 cursor-pointer
         hover:-translate-y-0.5 transition-transform duration-300"
        >
          Entrar
        </button>

        <p className="mt-10 text-center">Ainda não tem uma conta? <span className="text-blue-400 cursor-pointer">Cadastre-se</span></p>
      </form>
    </div>
  )
}