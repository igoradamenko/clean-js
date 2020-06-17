const webpack = require('webpack');
const Define = webpack.DefinePlugin;
const Html = require('html-webpack-plugin');

const path = x => (require('path')).resolve(__dirname, '..', ...x.split('/'));

const basePath = process.env.BASE_PATH || '/';
const publicPath = path('public');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.js',
  },
  output: {
    path: publicPath,
    publicPath: basePath,
    filename: '[name].[hash].js',
  },
  resolve: {
    modules: [path('src'), 'node_modules'],
    extensions: ['.js'],
  },
  optimization: {
    noEmitOnErrors: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          // Приоритет отрицательный, чтобы в этот чанк попали только модули, которые не попали в другие группы.
          // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkscachegroupscachegrouppriority
          priority: -10,
        },
      },
    },
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /.jade$/,
        loader: 'jade-loader',
      },
    ],
  },
  plugins: [
    new Define({
      BASE_PATH: JSON.stringify(basePath),
    }),
    new Html({
      template: path('src/index.jade'),
      basePath,
      minify: {
        removeScriptTypeAttributes: true,
      },
    }),
  ],
  devServer: {
    port: 8080,
    contentBase: publicPath,
    historyApiFallback: true,
  },
};
