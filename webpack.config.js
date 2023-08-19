const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new ESLintPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: 'source-map',
    devServer: {
    static: './lib',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'umd',
    library: 'light-trading-chart',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  optimization: {
    runtimeChunk: 'single',
  },
};