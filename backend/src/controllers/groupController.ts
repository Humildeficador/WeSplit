import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '../lib/prisma'

export const memberSchema = z.object({
	userId: z.nanoid(),
	role: z.enum(['ADMIN', 'MEMBER']),
	joinedAt: z.date(),
})

export const expenseSchema = z.object({
	id: z.nanoid(),
	name: z.string(),
	description: z.string().nullish(),
	authorId: z.nanoid(),
	value: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
})

export const groupSchema = z.object({
	id: z.nanoid(),
	name: z.string(),
	description: z.string().nullish(),
	createdAt: z.date(),
	updatedAt: z.date(),
})

/* cria um grupo no banco de dados com um usuario admin */
export const createGroupBodySchema = z.object({
	name: z.string(),
	description: z.string().nullish(),
})

export async function createGroup(
	request: FastifyRequest<{ Body: z.infer<typeof createGroupBodySchema> }>,
	reply: FastifyReply,
) {
	const { name, description } = request.body

	const group = await prisma.group.create({
		data: {
			name,
			description,
			members: {
				create: {
					userId: request.user.sub,
					role: 'ADMIN',
				},
			},
		},
	})

	return reply.status(201).send({ group })
}

/* retorna um grupo pelo id se o usuario logado fizer parte dele */
export const getGroupByIdParamSchema = z.object({
	id: z.nanoid(),
})

export const getGroupDetailsResponseSchema = groupSchema.extend({
	members: memberSchema.array(),
})

export async function getGroupDetails(
	request: FastifyRequest<{ Params: z.infer<typeof getGroupByIdParamSchema> }>,
	reply: FastifyReply,
) {
	const { id } = request.params
	const userId = request.user.sub

	const group = await prisma.group.findUniqueOrThrow({
		where: {
			id,
			AND: {
				members: {
					some: {
						userId,
					},
				},
			},
		},
		include: {
			members: true,
		},
	})

	return reply.status(200).send({ group })
}
