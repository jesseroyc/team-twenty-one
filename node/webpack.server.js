const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/server.js',
  target: 'node',
  externals: [nodeExternals()],

  output: {
    path: path.resolve('build'),
    filename: 'server.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ],
  rules: [
  {
    test: /\.tsx?$/,
    loader: 'babel-loader',
  },
  {
    test: /\.js$/,
    use: ["source-map-loader"],
    enforce: "pre"
  }
  "moduleFileExtensions"
    "ts"
    "tsx"
    "js"
    "jsx"
    "json"
  "testRegex(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$" 
  "transform": {
    "^.+\\.tsx?$ts-jest"
  }
};