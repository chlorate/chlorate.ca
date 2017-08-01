module.exports = {
	plugins: {
		"postcss-uncss": {
			html: [
				"mm10rng/*.tsx",
				"site/content/**/*.html",
				"site/layouts/{_default,shortcodes}/**/*.html",
			],
			ignore: [/\.page-.*/],
		},
	},
};
