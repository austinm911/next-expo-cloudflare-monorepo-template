import queryPlugin from '@tanstack/eslint-plugin-query'

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
    {
        plugins: {
            '@tanstack/eslint-plugin-query': queryPlugin,
        },
        rules: {
            '@tanstack/eslint-plugin-query/exhaustive-deps': 'error',
            '@tanstack/eslint-plugin-query/no-rest-destructuring': 'warn',
            '@tanstack/eslint-plugin-query/stable-query-client': 'error',
        },
    },
]
