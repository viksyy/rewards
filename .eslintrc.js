module.exports = {
	root: true,
	extends: '@react-native-community',
	plugins: ['sort-imports-es6-autofix'],
	rules: {
		'react-native/no-inline-styles': 0,
		'react-native/no-unused-styles': 2,
		'react-native/no-single-element-style-arrays': 2,
		'react-native/no-color-literals': 2,
		'react-hooks/exhaustive-deps': 0,
		'react-native/no-raw-text': 2,
		'react-native/sort-styles': [
			2,
			'asc',
			{
				ignoreClassNames: false,
				ignoreStyleProperties: false,
			},
		],
		'no-console': 2,
		'no-debugger': 2,
		'no-new': 0,
		'jsx-quotes': 0,
		'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
		'sort-imports-es6-autofix/sort-imports-es6': [
			2,
			{
				ignoreCase: false,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
			},
		],
	},
};
