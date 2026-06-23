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
	/* middleware de autenticação nessa rota inteira */
	app.addHook('onRequest', verifyJwt)

	/* GET /user -> retorna todos os usuarios */
	app.get(
		'/',
		{
			schema: {
				summary: 'Lista todos os usuários',
				tags: ['Users'],
				security: [{ bearerAuth: [] }],
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
				security: [{ bearerAuth: [] }],
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
				security: [{ bearerAuth: [] }],
				body: createUserBodySchema,
				response: {
					201: userResponseSchema,
				},
			},
		},
		createUser,
	)
}
