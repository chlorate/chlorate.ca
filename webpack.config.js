const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
	entry: {
		mm10rng: "./mm10rng/index.tsx",
		styles: "bootstrap-loader",
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
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
				use: "babel-loader",
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: ["babel-loader", "ts-loader"],
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
