module.exports = {
	plugins: {
		'tailwindcss/nesting': 'postcss-nested',
		'postcss-import': {},
		'postcss-simple-vars': {},
		'postcss-mixins': {},
		'postcss-preset-env': {
			autoprefixer: { grid: true },
			stage: 0,
			features: {
				clamp: true,
				'logical-properties-and-values': true,
				'media-query-ranges': {
					preserve: true,
				},
				'custom-properties': true,
			},
		},
		tailwindcss: {},
	},
};
