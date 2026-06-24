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

/* retorna um grupo do bando de dados pelo id */

export async function getMyGroups(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const userId = request.user.sub

	const groups = await prisma.group.findMany({
		where: {
			members: {
				some: {
					userId,
				},
			},
		},
	})

	return reply.status(200).send({ groups })
}
