import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
	login,
	loginBodySchema,
	loginResponseSchema,
} from '../controllers/authController'

// biome-ignore lint/suspicious/noExplicitAny: <não há necessidade atual dos outro tipos>
type FastifyZodInstance = FastifyInstance<any, any, any, any, ZodTypeProvider>

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
