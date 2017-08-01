module.exports = {
	plugins: {
		"postcss-uncss": {
			html: ["mm10rng/*.js", "site/**/*.html"],
			ignore: [/\.page-.*/],
		},
	},
};
