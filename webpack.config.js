const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    "light-trading-chart": './src/index.ts',
    "light-trading-chart.min": './src/index.ts'
  },
  mode: 'development',
  plugins: [
    new ESLintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /webpack.config.js/],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: 'source-map',
    devServer: {
      static: './dist',
  },
  output: {
    path: path.resolve(__dirname, '_bundles'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'LightTradingChart',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts'],
  },
  optimization: {
    runtimeChunk: 'single',
  },
};