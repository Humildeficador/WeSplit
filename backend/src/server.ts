import { app } from './app'

async function init() {
	const PORT = Number(process.env.PORT) || 3333
	try {
		await app.listen({ port: PORT, host: '0.0.0.0' })
		console.log('🚀 Server running on http://localhost:3333')
	} catch (err) {
		app.log.error(err)
		process.exit(1)
	}
}

init()
