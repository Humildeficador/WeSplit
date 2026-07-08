import type z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../Shared/Input"
import { Lock, Mail, User } from "lucide-react"
import { api } from "../../../api"
import { useAuth } from "../../../hooks/useAuth"
import { Link, useNavigate } from "react-router-dom"
import { registerSchema } from "../../../schemas/registerSchema"
import axios from "axios"
import { useState } from "react"

export const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema)
  })

  const [registerError, setRegisterError] = useState<string | null>(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      await api.post('/users', { name: data.name, email: data.email, password: data.password })
      const authResponse = await api.post('/auth', { email: data.email, password: data.password })
      login(authResponse.data.token)
      reset()
      navigate('/activity')

    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setRegisterError("Este e-máil já está cadastrado com outra conta.")
        } else {
          setRegisterError(err.response?.data?.message ?? "Ops, algo deu errado. Tente novamente mais tarde.")
        }
      }
    }
  }

  return (
    <div className="bg-surface-card rounded-lg w-120 flex flex-col py-6 px-13 border border-hairline">
      <div>
        <h1 className="mt-7 font-semibold text-2xl">Seja bem-vindo!</h1>
        <p className="text-white/50 text-sm mt-2">Crie sua conta de maneira simples!</p>
      </div>

      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Seu nome"
          type="text"
          placeholder="Digite seu nome"
          icon={User}
          error={errors.name?.message}
          registration={register('name', { onChange: () => setRegisterError(null) })}
        />

        <Input
          label="Seu e-mail"
          type="email"
          placeholder="seu@email.com"
          icon={Mail}
          error={errors.email?.message}
          registration={register('email', { onChange: () => setRegisterError(null) })}
        />

        <Input
          label="Criar senha"
          type="password"
          placeholder="Digite sua senha"
          icon={Lock}
          error={errors.password?.message}
          registration={register('password', { onChange: () => setRegisterError(null) })}
        />

        <Input
          label="Confirme sua senha"
          type="password"
          placeholder="Confirme sua senha"
          icon={Lock}
          error={errors.confirmPassword?.message}
          registration={register('confirmPassword', { onChange: () => setRegisterError(null) })}
        />

        <button
          type="submit"
          className="
        bg-blue-400 col-span-full rounded-lg py-2 mt-15 cursor-pointer
          hover:-translate-y-0.5 transition-transform duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Carregando..." : "Inscrever-se"}
        </button>

        {registerError &&
          <p className="border border-danger bg-danger/10 text-danger mt-4 px-3 rounded-md col-span-full">
            ⓘ {registerError}
          </p>}

      </form>
      <p className="mt-10 text-center">Já tem uma conta? <Link to={"/"} className="text-blue-400 cursor-pointer hover:text-blue-300 transition-colors duration-300">Entrar</Link></p>
    </div>
  )
}