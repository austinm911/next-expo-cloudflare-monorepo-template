import { Hono } from 'hono'
import { hc } from 'hono/client'
import { prettyJSON } from 'hono/pretty-json'

const app = new Hono()
	.use(prettyJSON())
	.get('/', (c) => {
		return c.text('Hello Hono!')
	})
	.get('/mock', (c) => {
		const mockData = [
			{ id: 1, message: 'Hello Hono!' },
			{ id: 2, message: 'Hello again!' },
			{ id: 3, message: "Hello again it's me!" },
		]
		return c.json(mockData)
	})

const routes = app.route('/', app).route('/mock', app)

export default app

type AppType = typeof routes

const apiUrl = 'https://localhost:8787'
export const client = hc<AppType>(apiUrl)
