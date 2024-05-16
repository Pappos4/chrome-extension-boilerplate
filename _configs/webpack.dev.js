const { merge } = require("webpack-merge");

const common = require("./webpack.common");

/** @type { import('webpack').Configuration } */
const devConfiguration = {
  mode: "development",

  devtool: "inline-source-map",

  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
    webSocketServer: "sockjs",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    allowedHosts: "all",
  },
};

module.exports = merge(common, devConfiguration);
