const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const env = require("dotenv").config().parsed;

module.exports = {
  mode: "development",
  entry: {
    main: __dirname + "/src/main.tsx",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: [/\.ts$/, /\.tsx$/],
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpg|gif)/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [__dirname + "/node_modules"],
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      favicon: "./src/images/favicon.ico",
    }),
    env !== undefined
      ? new webpack.DefinePlugin({
          "process.env": JSON.stringify(process.env),
        })
      : new webpack.DefinePlugin({
          "process.env.REACT_PUBLIC_API_URL": JSON.stringify(
            process.env.REACT_PUBLIC_API_URL
          ),
        }),
  ],
  devServer: {
    static: {
      directory: __dirname + "/dist",
    },
    port: 8080,
  },
};
