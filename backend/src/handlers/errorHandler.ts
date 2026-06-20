import { FastifyInstance } from 'fastify'
import z, { ZodError } from 'zod'
import { Prisma } from '../../generated/prisma/client'

export function setupErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: 'Erro de validação',
        issues: z.treeifyError(error),
      })
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return reply.status(409).send({ message: 'Conflito: Dado já cadastrado' })
      }
    }

    app.log.error(error)
    return reply.status(500).send({ message: 'Erro interno do servidor' })
  })
}