import z from 'zod'
import {
	createGroup,
	createGroupBodySchema,
	getGroupDetails,
	getGroupDetailsResponseSchema,
	groupSchema,
} from '../controllers/groupController'
import type { FastifyZodInstance } from '../lib/fastify'
import { verifyJwt } from '../middlewares/authMiddleware'

export async function groupRoutes(app: FastifyZodInstance) {
	/* middleware de autenticação nessa rota inteira */
	app.addHook('onRequest', verifyJwt)

	/* POST /group -> cria um grupo com um usuario admin */
	app.post(
		'/',
		{
			schema: {
				summary: 'Criação de grupo',
				tags: ['Groups'],
				security: [{ bearerAuth: [] }],
				body: createGroupBodySchema,
				response: {
					201: z.object({
						group: groupSchema,
					}),
				},
			},
		},
		createGroup,
	)

	app.get(
		'/:id',
		{
			schema: {
				summary: 'Busca um grupo pelo ID',
				tags: ['Groups'],
				security: [{ bearerAuth: [] }],
				params: z.object({
					id: z.nanoid(),
				}),
				response: {
					200: z.object({
						group: getGroupDetailsResponseSchema,
					}),
				},
			},
		},
		getGroupDetails,
	)
}
