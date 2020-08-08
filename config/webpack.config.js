const webpack = require('webpack');
const Html = require('html-webpack-plugin');

const Define = webpack.DefinePlugin;

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
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer'),
                require('postcss-url')({ url: 'inline', maxSize: 5 }),
              ],
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: true,
              sassOptions: {
                fiber: require('fibers'),
                includePaths: [path('src')],
              },
            },
          },
        ],
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
