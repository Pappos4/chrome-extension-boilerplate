const { merge } = require("webpack-merge");
const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");

const common = require("./webpack.common");

/** @type { import('webpack').Configuration } */
const prodConfiguration = {
  mode: "production",

  devtool: false,

  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: "js/[name].bundle.js",
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
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
