import type { FastifyInstance } from 'fastify'
import z from 'zod'
import { prisma } from '../lib/prisma'

export async function users(app: FastifyInstance) {
	/* Rota de get users, lista todos os usuarios do banco de dados */
	app.get('/', async (_, reply) => {
		const allUsers = await prisma.user.findMany()

		return reply.status(200).send(allUsers)
	})

	app.post('/', async (request, reply) => {
		const createUserSchema = z.object({
			name: z.string().min(3),
			email: z.string().email(),
		})

		const { name, email } = createUserSchema.parse(request.body)

		const user = await prisma.user.create({
			data: { name, email },
		})

		return reply.status(201).send(user)
	})
}
