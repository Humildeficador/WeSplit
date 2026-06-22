import bcrypt from 'bcrypt'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '../lib/prisma'

/* schemas */
export const getUserByIdParamsSchema = z.object({
	id: z.nanoid(),
})

export const createUserBodySchema = z.object({
	name: z.string().min(3),
	email: z.email().transform((email) => email.toLowerCase()),
	password: z.string().min(8).max(72),
})

export const userResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.email(),
	createdAt: z.date(),
	updatedAt: z.date(),
})

/* retorna todos os usuarios do banco de dados */
export async function getUser(_: FastifyRequest, reply: FastifyReply) {
	const allUsers = await prisma.user.findMany({
		omit: {
			password: true,
		},
	})

	return reply.status(200).send(allUsers)
}

/* retorna um usuario do banco de dados pelo id */
export async function getUserById(
	request: FastifyRequest<{ Params: z.infer<typeof getUserByIdParamsSchema> }>,
	reply: FastifyReply,
) {
	const { id } = request.params

	const user = await prisma.user.findUniqueOrThrow({
		omit: { password: true },
		where: { id },
	})

	return reply.status(200).send(user)
}

/* cria um usuario com email unico no banco de dados e retorna ele */
export async function createUser(
	request: FastifyRequest<{ Body: z.infer<typeof createUserBodySchema> }>,
	reply: FastifyReply,
) {
	const { name, email, password } = request.body

	const hashedPassword = await bcrypt.hash(password, 10)

	const user = await prisma.user.create({
		omit: {
			password: true,
		},
		data: {
			name,
			email,
			password: hashedPassword,
		},
	})

	return reply.status(201).send(user)
}
