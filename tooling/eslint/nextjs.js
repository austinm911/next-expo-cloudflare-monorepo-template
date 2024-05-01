import nextPlugin from '@next/eslint-plugin-next'

// TODO: add next-on-pages config once they upgrade to ESLint 9
// import nextOnPagesPlugin from 'eslint-plugin-next-on-pages'

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: {
			'@next/next': nextPlugin,
			// 'next-on-pages': nextOnPagesPlugin,
		},

		rules: {
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs['core-web-vitals'].rules,
			// ...nextOnPagesPlugin.configs.recommended.rules,
			// TypeError: context.getAncestors is not a function
			'@next/next/no-duplicate-head': 'off',
		},
	},
]
