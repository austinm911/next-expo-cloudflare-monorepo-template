import 'server-only'

import { cache } from 'react'
import { headers } from 'next/headers'

import { createCaller, createTRPCContext } from '@acme/api'

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
	const heads = new Headers(headers())
	heads.set('x-trpc-source', 'rsc')

	// Assuming createTRPCContext expects an object with 'env' and 'req' properties
	return createTRPCContext(heads)
})
export const api = createCaller(createContext)
