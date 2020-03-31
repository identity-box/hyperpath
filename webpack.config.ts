const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src'),

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'hyperpath',
    libraryTarget: 'global'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      { test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },

  plugins: [new ForkTsCheckerWebpackPlugin()],

  devServer: {
    contentBase: path.join(__dirname, 'demo')
  }
}
