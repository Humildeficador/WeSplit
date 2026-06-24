import z from 'zod'
import { getMyGroups, groupSchema } from '../controllers/meController'
import type { FastifyZodInstance } from '../lib/fastify'
import { verifyJwt } from '../middlewares/authMiddleware'

export async function meRoutes(app: FastifyZodInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get(
		'/groups',
		{
			schema: {
				summary: 'Listar os grupos do usuário logado',
				tags: ['Me'],
				security: [{ bearerAuth: [] }],
				response: {
					200: z.object({
						groups: groupSchema.array(),
					}),
				},
			},
		},
		getMyGroups,
	)
}
