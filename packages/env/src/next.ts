import { vercel } from '@t3-oss/env-core/presets'
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

import { createValidatedEnv } from './base'

const base = createValidatedEnv(process.env)

export const env = createEnv({
	extends: [vercel(), base],
	client: {
		NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
	},

	// For Next.js >= 13.4.4, you only need to destructure client variables:
	experimental__runtimeEnv: {
		NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
	},
	skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION || process.env.npm_lifecycle_event === 'lint',
})