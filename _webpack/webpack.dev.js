const { merge } = require("webpack-merge");

const common = require("./webpack.common");

/** @type { import('webpack').Configuration } */
const devConfiguration = {
  mode: "development",

  devtool: "inline-source-map",

  devServer: {
    // Enables gzip compression
    compress: true,
    hot: true,
    port: 3000,
    webSocketServer: "sockjs",
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    client: {
      logging: "none",
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
};

module.exports = merge(common, devConfiguration);
