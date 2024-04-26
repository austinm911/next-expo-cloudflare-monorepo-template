import baseConfig from '@acme/eslint-config/base'
import nativeConfig from '@acme/eslint-config/native'
import reactConfig from '@acme/eslint-config/react'

/** @type {import('typescript-eslint').Config} */
export default [
    {
        ignores: ['.expo/**', 'expo-plugins/**'],
    },
    ...baseConfig,
    ...reactConfig,
    ...nativeConfig,
]
