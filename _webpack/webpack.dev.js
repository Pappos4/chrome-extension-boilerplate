const { merge } = require("webpack-merge");

const common = require("./webpack.common");

/** @type { import('webpack').Configuration } */
const devConfiguration = {
  mode: "development",

  devtool: "inline-source-map",
};

module.exports = merge(common, devConfiguration);
