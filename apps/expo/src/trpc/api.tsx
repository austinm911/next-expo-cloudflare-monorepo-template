import React, { useState } from 'react'
import Constants from 'expo-constants'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import superjson from 'superjson'

import type { AppRouter } from '@acme/api'

export { type RouterInputs, type RouterOutputs } from '@acme/api'

// Check if React is imported correctly
if (!React) {
	console.error('React is not defined. Check your import statements and package installations.')
}

// Check if useState is available on the React object
if (typeof React.useState !== 'function') {
	console.error('useState is not a function on the React object. This could indicate a problem with React imports.')
}

/**
 * A set of typesafe hooks for consuming your API.
 */
export const api = createTRPCReact<AppRouter>()

/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
const getBaseUrl = () => {
	/**
	 * Gets the IP address of your host-machine. If it cannot automatically find it,
	 * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
	 * you don't have anything else running on it, or you'd have to change it.
	 *
	 * **NOTE**: This is only for development. In production, you'll want to set the
	 * baseUrl to your production API URL.
	 */
	const debuggerHost = Constants.expoConfig?.hostUri
	const localhost = debuggerHost?.split(':')[0]
	console.log('localhost', localhost)

	if (!localhost) {
		// return "https://production-site.com";
		// throw new Error('Failed to get localhost. Please point to your production server.')
		console.error('Failed to get localhost. Please point to your production server.')
	}
	return `http://${localhost}:3000`
}

/**
 * A wrapper for your app that provides the TRPC context.
 */
export function TRPCProvider(props: { children: React.ReactNode }) {
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
					url: `http://localhost:8787/trpc`, // api url
					headers() {
						const headers = new Map<string, string>()
						headers.set('x-trpc-source', 'expo-react')
						return Object.fromEntries(headers)
					},
				}),
			],
		}),
	)

	return (
		<api.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
		</api.Provider>
	)
}