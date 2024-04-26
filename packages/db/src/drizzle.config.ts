import type { Config } from 'drizzle-kit'
// import { createEnv } from "@t3-oss/env-core";
import * as z from 'zod'

// const env = createEnv({
//   server: {
//     DB_HOST: z.string(),
//     DB_NAME: z.string(),
//     DB_USERNAME: z.string(),
//     DB_PASSWORD: z.string(),
//   },
//   runtimeEnv: process.env,
//   emptyStringAsUndefined: true,
// });

// Push requires SSL so use URL instead of username/password
// export const connectionStr = new URL(`mysql://${env.DB_HOST}/${env.DB_NAME}`);
// connectionStr.username = env.DB_USERNAME;
// connectionStr.password = env.DB_PASSWORD;
// connectionStr.searchParams.set("ssl", '{"rejectUnauthorized":true}');

// Environment-specific database URLs
const devDbUrl = 'postgres://postgres:admin@0.0.0.0:5432/db'
const prodDbUrl = 'postgres://postgres:password@prod-host:5432/prod-db'

// Determine the environment and choose the appropriate URL
export const dbUrl = process.env.NODE_ENV === 'production' ? prodDbUrl : devDbUrl

export default {
	schema: './src/schema',
	driver: 'pg',
	dbCredentials: { connectionString: dbUrl },
	// tablesFilter: ["t3turbo_*"],
	verbose: true,
	strict: true,
	out: './migrations',
} satisfies Config
