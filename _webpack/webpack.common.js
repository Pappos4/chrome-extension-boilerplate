const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

const __rootDir = path.resolve(process.cwd());
const __buildDir = path.join(__rootDir, "/dist");

/** @type { import('webpack').Configuration } */
const options = {
  entry: {
    // Pages
    popup: path.join(__rootDir, "/src/popup/index.tsx"),
    settings: path.join(__rootDir, "/src/settings/index.tsx"),

    // Api
    background: path.join(__rootDir, "/src/service_worker/index.ts"),
    contentScript: path.join(__rootDir, "/src/index.ts"),
  },

  output: {
    path: __buildDir,
    publicPath: "/",
    filename: "js/[name].bundle.js",
  },

  plugins: [
    new webpack.DefinePlugin({
      _DEV_: isDevelopment,
    }),

    new HtmlWebpackPlugin({
      template: path.join(__rootDir, "/src/popup/index.html"),
      filename: "popup.html",
      chunks: ["popup"],
    }),

    new HtmlWebpackPlugin({
      template: path.join(__rootDir, "/src/settings/index.html"),
      filename: "settings.html",
      chunks: ["settings"],
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public/manifest.json",
          to: __buildDir,
          force: true,
        },
      ],
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
            options: {
              module: true,
            },
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
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
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
