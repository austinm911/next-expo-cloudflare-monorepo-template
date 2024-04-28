import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './global.css'

import { cn } from '@acme/ui'
import { ThemeProvider, ThemeToggle } from '@acme/ui/theme'
import { Toaster } from '@acme/ui/toast'

import { TRPCReactProvider } from '@/trpc/client'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={cn('min-h-screen bg-background font-sans text-foreground antialiased', inter.className)}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<TRPCReactProvider>{children}</TRPCReactProvider>
					<div className='absolute bottom-4 right-4'>
						<ThemeToggle />
					</div>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}
