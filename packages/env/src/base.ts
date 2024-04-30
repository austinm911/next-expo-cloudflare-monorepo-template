import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export function createValidatedEnv(values: Record<string, string | number | boolean | undefined>) {
	return createEnv({
		shared: {
			NODE_ENV: z.enum(['development', 'production', 'preview', 'test']).default('development'),
		},
		server: {
			APP_NEXT_URL: z.string().url(),
			APP_SPA_URL: z.string().url(),
			API_URL: z.string().url(),
			DATABASE_URL: z.string().url(),
			TEST_DATABASE_URL: z.string().url(),
		},

		/**
		 * By default, this library will feed the environment variables directly to
		 * the Zod validator.
		 *
		 * This means that if you have an empty string for a value that is supposed
		 * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
		 * it as a type mismatch violation. Additionally, if you have an empty string
		 * for a value that is supposed to be a string with a default value (e.g.
		 * `DOMAIN=` in an ".env" file), the default value will never be applied.
		 *
		 * In order to solve these issues, we recommend that all new projects
		 * explicitly specify this option as true.
		 */
		emptyStringAsUndefined: true,
		/**
		 * What object holds the environment variables at runtime. This is usually
		 * `process.env` or `import.meta.env`. Pass the env object to this function.
		 */
		runtimeEnv: values,
	})
}

export type BaseEnv = ReturnType<typeof createValidatedEnv>
