import React from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

export default function Page() {
    return (
        <View className='flex flex-1'>
            <Header />
            <Content />
            <Footer />
        </View>
    )
}

function Content() {
    return (
        <View className='flex-1'>
            <View className='py-12 md:py-24 lg:py-32 xl:py-48'>
                <View className='px-4 bg-green-200 md:px-6'>
                    <View className='flex flex-col gap-4 items-center text-center'>
                        <Text
                            role='heading'
                            className='text-3xl font-bold tracking-tighter text-center text-cyan-300 bg-red-900 native:text-5xl sm:text-4xl md:text-5xl lg:text-6xl'
                        >
                            Welcome to Project ACME
                        </Text>
                        <Text className='mx-auto max-w-[700px] text-center text-lg text-gray-500 dark:text-gray-400 md:text-xl'>
                            Discover and collaborate on amce. Explore our services now.
                        </Text>

                        <View className='gap-4'>
                            <Link
                                suppressHighlighting
                                className='flex overflow-hidden justify-center items-center px-4 py-2 h-9 text-sm font-medium text-gray-50 bg-gray-900 rounded-md transition-colors web:shadow ios:shadow web:focus-visible:outline-none web:focus-visible:ring-1 hover:bg-gray-900/90 focus-visible:ring-gray-950 active:bg-gray-400/90 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
                                href='/'
                            >
                                Explore
                            </Link>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

function Header() {
    const { top } = useSafeAreaInsets()
    return (
        <View style={{ paddingTop: top }}>
            <View className='flex flex-row justify-between items-center px-4 h-14 lg:px-6'>
                <Link className='flex-1 justify-center items-center font-bold' href='/'>
                    ACME
                </Link>
                <View className='flex flex-row gap-4 sm:gap-6'>
                    <Link className='font-medium text-md web:underline-offset-4 hover:underline' href='/'>
                        About
                    </Link>
                    <Link className='font-medium text-md web:underline-offset-4 hover:underline' href='/'>
                        Product
                    </Link>
                    <Link className='font-medium text-md web:underline-offset-4 hover:underline' href='/'>
                        Pricing
                    </Link>
                </View>
            </View>
        </View>
    )
}

function Footer() {
    const { bottom } = useSafeAreaInsets()
    return (
        <View className='flex bg-gray-100 native:hidden shrink-0' style={{ paddingBottom: bottom }}>
            <View className='flex-1 items-start px-4 py-6 md:px-6'>
                <Text className={'text-center text-gray-700'}>© {new Date().getFullYear()} Me</Text>
            </View>
        </View>
    )
}
