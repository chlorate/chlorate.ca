module.exports = {
	plugins: {
		"postcss-uncss": {
			html: ["mm10rng/*.tsx", "site/**/*.html"],
			ignore: [/\.page-.*/],
		},
	},
};
