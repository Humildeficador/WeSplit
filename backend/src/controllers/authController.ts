import bcrypt from 'bcrypt'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '../lib/prisma'

export const loginBodySchema = z.object({
	email: z.email().transform((email) => email.toLowerCase()),
	password: z.string().min(8).max(72),
})

export const loginResponseSchema = z.object({
	token: z.jwt(),
})

export async function login(
	request: FastifyRequest<{ Body: z.infer<typeof loginBodySchema> }>,
	reply: FastifyReply,
) {
	const { email, password } = request.body

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	if (!user) {
		return reply.code(401).send({ message: 'Credenciais inválidas' })
	}

	const isPasswordValid = await bcrypt.compare(password, user.password)

	if (!isPasswordValid) {
		return reply.code(401).send({ message: 'Credenciais inválidas' })
	}

	const token = await reply.jwtSign({ sub: user.id })

	return reply.code(200).send({ token })
}
