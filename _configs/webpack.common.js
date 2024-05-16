const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

/** @type { import('webpack').Configuration } */
const options = {
  entry: {
    popup: path.join(__dirname, "../src/popup/index.tsx"),
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    clean: true,
  },

  plugins: [
    new webpack.DefinePlugin({
      _DEV_: isDevelopment,
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src", "popup", "index.html"),
      filename: "popup.html",
      chunks: ["popup"],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheCompression: false,
              cacheDirectory: true,
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
                    useBuiltIns: "usage",
                    corejs: 3,
                  },
                ],
                "@babel/react",
                "@babel/typescript",
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};

module.exports = options;
