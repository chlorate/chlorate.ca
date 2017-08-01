const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
	entry: {
		styles: "bootstrap-loader",
	},
	output: {
		filename: "[name].[chunkhash].js",
		path: path.resolve(__dirname, "site/static/static"),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["env"],
						plugins: ["inferno"],
					},
				},
			},
			{
				test: /\.ttf$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[hash].[ext]",
					},
				},
			},
		],
	},
	plugins: [
		new ExtractTextPlugin("[name].[contenthash].css"),
		new ManifestPlugin({
			fileName: "../../data/static.json",
			publicPath: "/static/",
		}),
	],
};
