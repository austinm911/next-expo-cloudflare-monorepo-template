import '../global.css'

import { Slot } from 'expo-router'
import { useReactQueryDevTools } from '@dev-plugins/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Layout() {
    return <Providers />
}

const queryClient = new QueryClient()

function Providers() {
    useReactQueryDevTools(queryClient)
    return (
        <QueryClientProvider client={queryClient}>
            <Slot />
        </QueryClientProvider>
    )
}
