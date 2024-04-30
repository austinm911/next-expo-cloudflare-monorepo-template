import React from 'react'
import ReactDOM from 'react-dom/client'

import './global.css'

import { createRouter, RouterProvider } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { TRPCProvider } from './trpc/api'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

// Render the app
const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<React.StrictMode>
			<TRPCProvider>
				<RouterProvider router={router} />
			</TRPCProvider>
		</React.StrictMode>,
	)
}
