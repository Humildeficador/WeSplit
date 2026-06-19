import type { FastifyInstance } from 'fastify'
import z from 'zod'
import { prisma } from '../lib/prisma'

export async function users(app: FastifyInstance) {
	/* Rota de get users, lista todos os usuarios do banco de dados */
	app.get('/', async (_, reply) => {
		try {
			const allUsers = await prisma.user.findMany()

			return reply.status(200).send(allUsers)
		} catch (error) {
			app.log.error(error)
			return reply
				.status(500)
				.send({ error: 'Erro ao conectar ao banco de dados' })
		}
	})

	app.post('/', async (request, reply) => {
		/* schema de validação */
		const createUserSchema = z.object({
			name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
			email: z.email('Formato de e-mail invalido.'),
		})

		/* validação do corpo da requisição */
		const { name, email } = createUserSchema.parse(request.body)

		try {
			const user = await prisma.user.create({
				data: { name, email },
			})

			return reply.status(201).send(user)
		} catch (error) {
			if (error instanceof Error && 'code' in error && error.code === 'P2002') {
				return reply.status(409).send({ error: 'E-mail já cadastrado.' })
			}

			app.log.error(error)
			return reply.status(500).send({ error: 'Erro interno no servidor' })
		}
	})
}
