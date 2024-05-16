const { merge } = require("webpack-merge");
const path = require("path");

const common = require("./webpack.common");

/** @type { import('webpack').Configuration } */
const prodConfiguration = {
  mode: "production",

  devtool: false,

  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: "js/[name].[contenthash].bundle.js",
  },

  optimization: {
    minimize: true,
    runtimeChunk: {
      name: "runtime",
    },
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

module.exports = merge(common, prodConfiguration);
