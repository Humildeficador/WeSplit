import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '../lib/prisma'

export const createGroupBodySchema = z.object({
	name: z.string(),
	description: z.string().nullish(),
})

export const createGroupResponseSchema = z.object({
	name: z.string(),
	description: z.string().nullable(),
	id: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
})

/* cria um grupo no banco de dados com um usuario admin */
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
