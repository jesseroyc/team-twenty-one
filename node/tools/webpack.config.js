const path = require('path');
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const SERVER_FILE = path.resolve(__dirname, '../src/server.js');
const CLIENT_FILE = path.resolve(__dirname, '../src/client.js');

const ROOT_DIR   = path.resolve(__dirname);
const SRC_DIR   = path.resolve(__dirname, '../src');
const BUILD_DIR = path.resolve(__dirname, '../build');

module.exports = {
  mode: "development",
  context: ROOT_DIR,
  
  entry: SERVER_FILE,
  
  output: {
    path: BUILD_DIR,
    filename: 'server.js'
  },
  
  module: {
    rules: [
      {
        test:  /\.(js|jsx|mjs)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|less|styl|scss|sass|sss)$/,
        rules: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
      }
    ]
  },
  
  // Server configs
  target: 'node',
  
  node: {
    __dirname: false,
    __filename: false,
  },
  
  externals: [nodeExternals()],
};