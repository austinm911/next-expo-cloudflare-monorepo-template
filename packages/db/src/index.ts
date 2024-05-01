import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { dbUrl } from './drizzle.config'
import * as tables from './schema'

// for query purposes

export const createDb = (url: string) => {
	const queryClient = postgres(url)
	return drizzle(queryClient, { schema: tables })
}

export const db = createDb(dbUrl)
export * from 'drizzle-orm/sql'
export { tables }
export { alias } from 'drizzle-orm/pg-core'
