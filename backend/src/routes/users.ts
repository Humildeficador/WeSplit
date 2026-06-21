import bcrypt from 'bcrypt'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { prisma } from '../lib/prisma'

type FastifyZodInstance = FastifyInstance<any, any, any, any, ZodTypeProvider>

const userResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.email(),
	createdAt: z.date(),
	updatedAt: z.date(),
})

export async function users(app: FastifyZodInstance) {
	/* Rota de get users, lista todos os usuarios do banco de dados */
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
		async (_, reply) => {
			const allUsers = await prisma.user.findMany({
				omit: {
					password: true,
				},
			})

			return reply.status(200).send(allUsers)
		},
	)

	/* Rota de get user by id, retorna um usuario do banco de dados */
	app.get(
		'/:id',
		{
			schema: {
				summary: 'Busca um usuário pelo ID',
				tags: ['Users'],
				params: z.object({
					id: z.nanoid(),
				}),
				response: {
					200: userResponseSchema,
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params

			const user = await prisma.user.findUniqueOrThrow({
				omit: {
					password: true,
				},
				where: {
					id,
				},
			})

			return reply.status(200).send(user)
		},
	)

	/* Rota de createUser, cria um usuario a partir de um email unico */
	app.post(
		'/',
		{
			schema: {
				summary: 'Cria um novo usuário',
				tags: ['Users'],
				body: z.object({
					name: z.string().min(3),
					email: z.email().transform((email) => email.toLowerCase()),
					password: z.string().min(8).max(72),
				}),
				response: {
					201: userResponseSchema,
				},
			},
		},
		async (request, reply) => {
			const { name, email, password } = request.body

			const hashedPassword = await bcrypt.hash(password, 10)

			const user = await prisma.user.create({
				omit: {
					password: true,
				},
				data: {
					name,
					email,
					password: hashedPassword,
				},
			})

			return reply.status(201).send(user)
		},
	)
}
