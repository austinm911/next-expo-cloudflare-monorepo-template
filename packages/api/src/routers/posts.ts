import type { TRPCRouterRecord } from '@trpc/server'
import { z } from 'zod'

// import { schema } from '@acme/db'

import { publicProcedure } from '../trpc'

const mockData = [
	{ id: 1, message: 'Hello Hono!' },
	{ id: 2, message: 'Hello again!' },
	{ id: 3, message: "Hello again it's me!" },
]
export const postRouter = {
	hello: publicProcedure.input(z.string().nullish()).query(({ input, ctx }) => {
		console.log(ctx)
		return `Hello ${input ?? 'World'}!`
	}),

	mock: publicProcedure.query(({ ctx }) => {
		return {
			ctx,
			mockData,
		}
	}),
	// all: publicProcedure.query(({ ctx }) => {
	// 	return ctx.db.select().from(schema.post)
	// }),
} satisfies TRPCRouterRecord
