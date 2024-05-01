import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import type { TRPCRequestInfo } from '@trpc/server/http'

// import { db } from '@acme/db'

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 * @example https://github.com/timothymiller/t4-app/blob/8f7ab4d1f0c2144248a145c46e57d2622175b912/packages/api/src/context.ts
 */
export const createTRPCContext = (headers?: Headers, opts?: FetchCreateContextFnOptions) => {
	// const { env } = honoContext
	const source = headers?.get('x-trpc-source') ?? 'unknown'

	console.log('➡️ ➡️ tRPC Request from', source)

	let info: TRPCRequestInfo | undefined
	let req: Request | undefined
	let resHeaders: Headers | undefined

	if (opts) {
		info = opts.info
		req = opts.req
		resHeaders = opts.resHeaders
	}

	return {
		// db,
		req,
		resHeaders,
		info,
	}
}
