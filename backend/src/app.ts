import cors from '@fastify/cors'
import fastify from 'fastify'
import { setupErrorHandler } from './handlers/errorHandler'
import { users } from './routes/users'

const app = fastify()

setupErrorHandler(app)

app.register(cors, {
	origin: '*',
})

app.register(users, { prefix: '/users' })

export { app }
