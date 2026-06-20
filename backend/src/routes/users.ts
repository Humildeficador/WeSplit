import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { prisma } from '../lib/prisma'

type FastifyZodInstance = FastifyInstance<any, any, any, any, ZodTypeProvider>

export async function users(app: FastifyZodInstance) {
  /* Rota de get users, lista todos os usuarios do banco de dados */
  app.get(
    '/',
    {
      schema: {
        summary: 'Lista todos os usuários',
        tags: ['Users'],
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
              createdAt: z.date(),
            }),
          ),
        },
      },
    },
    async (_, reply) => {
      const allUsers = await prisma.user.findMany()
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
          200: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
            createdAt: z.date(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const user = await prisma.user.findUniqueOrThrow({
        where: { id },
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
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
            createdAt: z.date(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      const user = await prisma.user.create({
        data: { name, email },
      })

      return reply.status(201).send(user)
    },
  )
}