const path = require('path')

const { ProvidePlugin } = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const SpritePlugin = require('svg-sprite-loader/plugin')
const CopyPlugin = require('copy-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {}

  if (isProd) {
    config.minimizer = [new miniCssExtractPlugin(), new TerserWebpackPlugin()]
  }

  return config
}

const fileLoaderConfig = (ext) => [
  {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: `${isProd ? '/' : ''}assets/${ext}`,
    },
  },
]

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`)

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/js/index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(less)$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                paths: [path.resolve(__dirname, 'src/styles')],
                sourceMap: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: fileLoaderConfig('fonts'),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: path.resolve(__dirname, 'src/assets/sprite'),
        use: fileLoaderConfig('img'),
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'src/assets/sprite'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              outputPath: '/assets/sprite/',
            },
          },
          'svgo-loader',
        ],
      },
    ],
  },
  devtool: isDev ? 'source-map' : false,
  optimization: optimization(),
  plugins: [
    new SpritePlugin(),
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new HTMLWebpackPlugin({
      template: './public/index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: './public/404.html',
      inject: 'body',
      filename: '404.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: './public/ui.html',
      inject: 'body',
      filename: 'ui.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: './public/catalog/catalog.html',
      inject: 'body',
      filename: 'catalog.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: './public/catalog/catalog-detail.html',
      inject: 'body',
      filename: 'catalog-detail.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: './public/info/company.html',
      inject: 'body',
      filename: 'company.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: './public/info/contacts.html',
      inject: 'body',
      filename: 'contacts.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: './public/info/photo.html',
      inject: 'body',
      filename: 'photo.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: './public/info/vacancy.html',
      inject: 'body',
      filename: 'vacancy.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: './public/info/video.html',
      inject: 'body',
      filename: 'video.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: './public/services/build-material.html',
      inject: 'body',
      filename: 'build-material.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: './public/services/flexible-three.html',
      inject: 'body',
      filename: 'flexible-three.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: './public/services/foundations.html',
      inject: 'body',
      filename: 'foundations.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: './public/services/projection.html',
      inject: 'body',
      filename: 'projection.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets/img', to: './assets/img' },
        { from: './src/assets/files', to: './assets/files' },
      ],
    }),
    new CleanWebpackPlugin(),
    new miniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
}

if (isDev) {
  module.exports.devServer = {
    port: 3010,
    allowedHosts: 'all',
    client: {
      overlay: false,
    },
    hot: isDev,
    compress: true,
    liveReload: false,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://moidom.xyz',
        secure: false,
        changeOrigin: true,
      },
      '/upload': {
        target: 'http://moidom.xyz',
        secure: false,
        changeOrigin: true,
      },
    },
  }
}
