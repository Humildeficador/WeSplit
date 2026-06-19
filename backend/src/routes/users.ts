import type { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function users(app: FastifyInstance) {
	app.get('/', async (_, res) => {
		try {
			const allUsers = await prisma.user.findMany()

			return res.status(200).send(allUsers)
		} catch (error) {
			app.log.error(error)
			return res
				.status(500)
				.send({ error: 'Erro ao conectar ao banco de dados' })
		}
	})
}
