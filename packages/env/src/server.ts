import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

/** Pass into backend API to validate environment variables */
export function createValidatedEnv(values: Record<string, string | number | boolean | undefined>) {
	return createEnv({
		server: {
			API_URL: z.string().url(),
			NEXT_PAGES_PROJECT_NAME: z.string(), // Next.js Project name in Cloudflare Pages
			APP_NEXT_URL: z.string().url(),
			APP_SPA_URL: z.string().url(),
			SPA_PAGES_PROJECT_NAME: z.string(), // SPA Project name in Cloudflare Pages
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
		 * Pass the env object to this function.
		 */
		runtimeEnv: values,
	})
}

export type BaseEnv = ReturnType<typeof createValidatedEnv>
