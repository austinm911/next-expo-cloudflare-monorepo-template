'use client'

import { useState } from 'react'
import { QueryClient, QueryClientConfig, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { createTRPCReact } from '@trpc/react-query'
import SuperJSON from 'superjson'

import type { AppRouter } from '@acme/api'

export const api = createTRPCReact<AppRouter>()

const createQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				staleTime: 30 * 1000,
			},
		},
	})

let clientQueryClientSingleton: QueryClient | undefined = undefined
const getQueryClient = () => {
	if (typeof window === 'undefined') {
		// Server: always make a new query client
		return createQueryClient()
	} else {
		// Browser: use singleton pattern to keep the same query client
		return (clientQueryClientSingleton ??= createQueryClient())
	}
}

export function TRPCReactProvider(props: { children: React.ReactNode }) {
	const queryClient = getQueryClient()

	const [trpcClient] = useState(() =>
		api.createClient({
			links: [
				loggerLink({
					enabled: (op) =>
						process.env.NODE_ENV === 'development' ||
						(op.direction === 'down' && op.result instanceof Error),
				}),
				unstable_httpBatchStreamLink({
					//? https://trpc.io/docs/client/links/httpBatchStreamLink
					transformer: SuperJSON,
					url: getBaseUrl() + '/trpc', // need to inject url
					headers() {
						const headers = new Headers()
						headers.set('x-trpc-source', 'nextjs-react')
						return headers
					},
				}),
			],
		}),
	)

	return (
		<QueryClientProvider client={queryClient}>
			<api.Provider client={trpcClient} queryClient={queryClient}>
				{props.children}
			</api.Provider>
		</QueryClientProvider>
	)
}

const getBaseUrl = () => {
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` //TODO: change to cloudflare pages hosted url
	console.log(process.env.PUBLIC_API_URL)
	// eslint-disable-next-line no-restricted-properties
	return 'http://localhost:8787' // cloudflare workers dev server
}
