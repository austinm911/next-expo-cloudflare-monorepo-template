import '../global.css'

import { Slot } from 'expo-router'

import { TRPCProvider } from '@/trpc/api'

export default function Layout() {
	return (
		<TRPCProvider>
			<Slot />
		</TRPCProvider>
	)
}
