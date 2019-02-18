const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

const config = {
  entry: {
    "input-display": "./node_modules/input-display/src/index.tsx",
    styles: "./src/index.scss"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "src/site/static/static")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"]
      },
      {
        test: /\.ttf$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]"
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: chunk => /^(input-display|styles)$/.test(chunk.name),
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /node_modules/
        }
      }
    }
  },
  plugins: [
    new ManifestPlugin({
      fileName: "../../data/static.json",
      publicPath: "/static/"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ]
};

module.exports = (env, options) => {
  const defines = {
    "process.env.NODE_ENV": JSON.stringify("production")
  };

  if (options.mode === "development") {
    defines["process.env.NODE_ENV"] = JSON.stringify("development");
  }

  config.plugins.push(new webpack.DefinePlugin(defines));
  return config;
};
