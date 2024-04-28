import { trpcServer } from '@hono/trpc-server' // Deno 'npm:@hono/trpc-server'
import { Hono } from 'hono'
// import { hc } from 'hono/client'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'

// import { db } from '@acme/db'

import type { AppRouter } from './routers.ts'
import { createTRPCContext } from './context'
import { appRouter, createCaller } from './routers.ts'

export type { RouterOutputs, RouterInputs } from './routers'

type Env = {
	APP_URL: string
	APP_SPA_URL: string
	// db: typeof db
}

export type HonoContext = {
	env: Env
}

//? https://hono.dev/getting-started/cloudflare-workers#load-env-when-local-development

const app = new Hono<{ Bindings: Env }>()
	// Setup CORS for the frontend
	.use('/trpc/*', async (c, next) => {
		if (c.env.APP_URL === undefined) {
			console.log(
				'APP_URL is not set. CORS errors may occur. Make sure the .dev.vars file is present at /packages/api/.dev.vars',
			)
		}
		return await cors({
			origin: (origin) => {
				const appHost = new URL(c.env.APP_URL).host
				const spaHost = new URL(c.env.APP_SPA_URL).host
				console.log(appHost, spaHost)
				return origin.endsWith(appHost) || origin.endsWith(spaHost) ? origin : c.env.APP_URL
			},
			credentials: true, // https://trpc.io/docs/client/cors
			allowMethods: ['GET', 'POST', 'OPTIONS'],
			// https://hono.dev/middleware/builtin/cors#options
		})(c, next)
	})
	// Setup TRPC server
	.use(
		'/trpc/*',
		trpcServer({
			router: appRouter,
		}),
	)
	.use(prettyJSON())

export default app

// Export tRPC stuff for front end clients
export { createCaller, createTRPCContext, type AppRouter }
