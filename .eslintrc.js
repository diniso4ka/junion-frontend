// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	globals: {
		NodeJS: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:i18next/recommended',
		'prettier',
		'plugin:import/recommended',
		'plugin:import/typescript',
	],
	settings: {
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/extensions': ['.ts, .tsx'],
		'react': {
			version: 'detect',
		},
	},
	overrides: [
		{
			files: ['**/src/**/*.test.{ts,tsx}'],
			rules: {
				'i18next/no-literal-string': 'off',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'prettier',
		'i18next',
		'react-hooks',
		'import',
		'simple-import-sort',
	],
	rules: {
		'react/display-name': 'off',
		'import/no-named-as-default': 'off',
		'no-debugger': 'warn',
		'no-console': 'error',
		'react/react-in-jsx-scope': 'off',
		'i18next/no-literal-string': [
			'error',
			{
				markupOnly: true,
				ignoreAttribute: ['to'],
			},
		],
		'quotes': ['error', 'single'],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					//Absolute imports (path from 'path')
					['^\\w+$'],
					// Packages. react related packages come first.
					['^react', '^@?\\w'],
					// Internal packages.
					['(components|modules|widgets|utils)(/.*|$)'],
					// Side effect imports.
					['^\\u0000'],
					// Parent imports. Put .. last.
					['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\.(?!/?$)'],
					// Assets
					['^shared\\/assets.+'],
					// Styles.
					['^.+\\.s?css$'],
				],
			},
		],
		'import/first': 'warn',
		'import/newline-after-import': 'warn',
		'import/no-duplicates': 'warn',
	},
};
