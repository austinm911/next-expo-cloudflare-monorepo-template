import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import superjson from 'superjson'

import type { AppRouter } from '@acme/api'
import { env } from '@acme/env/spa'

/**
 * A set of typesafe hooks for consuming your API.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const api = createTRPCReact<AppRouter>()

export function TRPCProvider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())
	const [trpcClient] = useState(() =>
		api.createClient({
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' ||
						(opts.direction === 'down' && opts.result instanceof Error),
					colorMode: 'ansi',
				}),
				httpBatchLink({
					transformer: superjson,
					url: `${env.API_URL}/trpc`, // api url
					headers() {
						const headers = new Map<string, string>()
						headers.set('x-trpc-source', 'react-spa')
						return Object.fromEntries(headers)
					},
				}),
			],
		}),
	)

	return (
		<api.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</api.Provider>
	)
}
