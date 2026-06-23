import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { setupErrorHandler } from './handlers/errorHandler'
import { authRoutes } from './routes/auth'
import { groupRoutes } from './routes/groups'
import { usersRoutes } from './routes/users'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'WeSplit API',
			description: 'Documentação do back-end',
			version: '1.0.0',
		},
	},
	transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
	routePrefix: '/docs',
})

app.register(cors, {
	origin: '*',
})

app.register(jwt, {
	secret: process.env.JWT_SECRET || 'jwt_secret',
})

setupErrorHandler(app)

app.register(authRoutes, { prefix: '/auth' })
app.register(usersRoutes, { prefix: '/users' })
app.register(groupRoutes, { prefix: '/groups' })

export { app }
