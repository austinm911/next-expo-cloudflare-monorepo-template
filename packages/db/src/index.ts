import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { dbUrl } from './drizzle.config'

// for query purposes
const queryClient = postgres(dbUrl)

export const db = drizzle(queryClient)
