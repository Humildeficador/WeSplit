import cors from '@fastify/cors'
import fastify from 'fastify'
import { users } from './routes/users'

const app = fastify()

app.register(cors, {
	origin: '*',
})

app.register(users, { prefix: '/users' })

export { app }
