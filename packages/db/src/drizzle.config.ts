import type { Config } from 'drizzle-kit'

import { createValidatedEnv } from '@acme/env/server'

const env = createValidatedEnv(process.env)

// Determine the environment and choose the appropriate URL
export const dbUrl = process.env.NODE_ENV === 'production' ? env.DATABASE_URL : env.TEST_DATABASE_URL

export default {
	schema: './src/schema',
	driver: 'pg',
	dbCredentials: { connectionString: dbUrl },
	// tablesFilter: ["t3turbo_*"],
	verbose: true,
	strict: true,
	out: './migrations',
} satisfies Config
