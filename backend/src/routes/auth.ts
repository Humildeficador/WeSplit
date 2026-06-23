import {
	login,
	loginBodySchema,
	loginResponseSchema,
} from '../controllers/authController'
import type { FastifyZodInstance } from '../lib/fastify'

export async function authRoutes(app: FastifyZodInstance) {
	app.post(
		'/',
		{
			schema: {
				summary: 'Rota de autenticação',
				tags: ['Auth'],
				body: loginBodySchema,
				response: {
					200: loginResponseSchema,
				},
			},
		},
		login,
	)
}
