module.exports = {
	plugins: {
		"postcss-uncss": {
			html: "site/**/*.html",
			ignore: [/\.page-.*/],
		},
	},
};
