/** biome-ignore-all lint/suspicious/noExplicitAny: <não há necessidade atual dos outro tipos> */
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export type FastifyZodInstance = FastifyInstance<
	any,
	any,
	any,
	any,
	ZodTypeProvider
>
