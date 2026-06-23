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

export async function usersRoutes(app: FastifyZodInstance) {
	/* GET /user -> retorna todos os usuarios */
	app.get(
		'/',
		{
			schema: {
				summary: 'Lista todos os usuários',
				tags: ['Users'],
				response: {
					200: z.array(userResponseSchema),
				},
			},
		},
		getUser,
	)

	/* GET /user/:id -> retorna um usuario pelo id */
	app.get(
		'/:id',
		{
			schema: {
				summary: 'Busca um usuário pelo ID',
				tags: ['Users'],
				params: getUserByIdParamsSchema,
				response: {
					200: userResponseSchema,
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
					201: userResponseSchema,
				},
			},
		},
		createUser,
	)
}
