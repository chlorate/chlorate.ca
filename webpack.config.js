const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
	entry: {
		"input-display": "./node_modules/input-display/src/index.tsx",
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
				use: "babel-loader",
			},
			{
				test: /\.tsx?$/,
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
		new webpack.DefinePlugin({
			env: {
				development: process.env.DEVELOPMENT === "true" || false,
			},
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: function(module) {
				return (
					module.context &&
					module.context.indexOf("node_modules") >= 0 &&
					!/(bootstrap|css|style)-loader|input-display/.test(module.context)
				);
			},
		}),
	],
};
