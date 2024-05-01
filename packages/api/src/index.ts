import { trpcServer } from '@hono/trpc-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'

import type { BaseEnv } from '@acme/env/server'
import { createDb } from '@acme/db'
import { createValidatedEnv } from '@acme/env/server'

import type { AppRouter } from './routers.ts'
import { createTRPCContext } from './context'
import { appRouter, createCaller } from './routers.ts'

export type HonoContext = {
	env: BaseEnv & {
		// Cloudflare specific environment variables
		DB: ReturnType<typeof createDb>
	}
}

//? https://hono.dev/getting-started/cloudflare-workers#load-env-when-local-development

const app = new Hono<{ Bindings: HonoContext['env'] }>()
	.use('*', async (c, next) => {
		const { DB, ...restEnv } = c.env
		// Only validate the .dev.vars file in development
		createValidatedEnv(restEnv)
		console.log(`Context: ${JSON.stringify(c.env, null, 2)}`)
		return next()
	})
	// Setup CORS for the frontend'
	.use('/trpc/*', async (c, next) => {
		if (c.env.APP_NEXT_URL === undefined || c.env.APP_SPA_URL === undefined) {
			console.log(
				'APP_URL is not set. CORS errors may occur. Make sure the .dev.vars file is present at /packages/api/.dev.vars',
			)
		}
		return await cors({
			origin: (origin) => {
				const cloudflarePreviewRegexNext = new RegExp(`\.${c.env.NEXT_PAGES_PROJECT_NAME}\.pages\.dev$`)
				const cloudflarePreviewRegexSpa = new RegExp(`\.${c.env.SPA_PAGES_PROJECT_NAME}\.pages\.dev$`)
				const appHost = new URL(c.env.APP_NEXT_URL).host
				const spaHost = new URL(c.env.APP_SPA_URL).host
				const preview = 'http://localhost:8788' // cloudflare pages preview
				console.log('Origin: ', origin)
				console.log(`CloudflarePreviewRegexNext: ${cloudflarePreviewRegexNext.source}`)
				return origin.endsWith(appHost) ||
					origin.endsWith(spaHost) ||
					origin.endsWith(preview) ||
					cloudflarePreviewRegexNext.test(origin) ||
					cloudflarePreviewRegexSpa.test(origin)
					? origin
					: c.env.APP_NEXT_URL
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
	.get('/', (c) => {
		return c.text(`Hello World! ${JSON.stringify(c.env, null, 2)}`)
	})

export default app

// Export tRPC stuff for front end clients
export { createCaller, createTRPCContext, type AppRouter }
export type { RouterOutputs, RouterInputs } from './routers'
