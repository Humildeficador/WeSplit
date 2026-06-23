import z from 'zod'
import {
	createUser,
	createUserBodySchema,
	getUser,
	getUserById,
	getUserByIdParamsSchema,
	userResponseSchema,
} from '../controllers/userController'
import type { FastifyZodInstance } from '../lib/fastify'
import { verifyJwt } from '../middlewares/authMiddleware'

export async function usersRoutes(app: FastifyZodInstance) {
	/* GET /user -> retorna todos os usuarios */
	app.get(
		'/',
		{
			onRequest: [verifyJwt],
			schema: {
				summary: 'Lista todos os usuários',
				tags: ['Users'],
				security: [{ bearerAuth: [] }],
				response: {
					200: z.object({
						users: z.array(userResponseSchema),
					}),
				},
			},
		},
		getUser,
	)

	/* GET /user/:id -> retorna um usuario pelo id */
	app.get(
		'/:id',
		{
			onRequest: [verifyJwt],
			schema: {
				summary: 'Busca um usuário pelo ID',
				tags: ['Users'],
				security: [{ bearerAuth: [] }],
				params: getUserByIdParamsSchema,
				response: {
					200: z.object({
						user: userResponseSchema,
					}),
				},
			},
		},
		getUserById,
	)

	/* POST /user -> cria um usuario com email unico e retorna ele */
	app.post(
		'/',
		{
			schema: {
				summary: 'Cria um novo usuário',
				tags: ['Users'],
				body: createUserBodySchema,
				response: {
					201: z.object({
						user: userResponseSchema,
					}),
				},
			},
		},
		createUser,
	)
}
