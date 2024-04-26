import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

import { dbUrl } from './drizzle.config'

// for migrations
const migrationClient = postgres(dbUrl, { max: 1 })
migrate(drizzle(migrationClient), { migrationsFolder: 'migrations' })

// for query purposes
const queryClient = postgres(dbUrl)

export const db = drizzle(queryClient)
