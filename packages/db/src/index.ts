import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { dbUrl } from './drizzle.config'
import * as schema from './schema'

// for query purposes

export const createDatabase = (url: string) => {
	const queryClient = postgres(url)
	return drizzle(queryClient, { schema: schema })
}

export const db = createDatabase(dbUrl)
export * from 'drizzle-orm/sql'
export { schema }
export { alias } from 'drizzle-orm/pg-core'
