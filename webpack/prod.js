const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      "babel-loader",
    ],
  }, {
    test: /\.json$/,
    exclude: /node_modules/,
    use: ['json-loader']
  },
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      // use: ['css-loader', 'postcss-loader']
      use: [
        {
          loader: 'css-loader',
          options: {
            minimize: true,
            sourceMap: false
          },
        },
        {
          loader: 'postcss-loader',
        },
      ],
    })
  },
  {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      // use: ['css-loader', 'postcss-loader', 'less-loader']
      use: [
        {
          loader: 'css-loader',
          options: {
            minimize: true,
            sourceMap: false
          },
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: false
          }
        }
      ],
    })
  },
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: [{
      loader: 'file-loader',
      options: {
        name: '/static/[name]-[hash].[ext]',
      }
    }]
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [{
      loader: 'file-loader',
      options: {
        name: '/static/[name]-[hash].[ext]',
      }
    }]
  }
];

const config = {
  resolve: {
    extensions: ['.web.js', '.js', '.jsx']
  },
  entry: './src/client.js',
  output: {
    path: path.join(__dirname, '../dist'),
    // publicPath: '/dist/',
    filename: '[name].min.js',
    // chunkFilename: '[name].min.js'
  },

  module: {
    loaders: loaders
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CleanWebpackPlugin(['dist'], { root: path.join(__dirname, '..') }),
    new HtmlWebpackPlugin({
      title: 'ReactStartKit',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        collapseInlineTagWhitespace: true
      },
      template: path.join(__dirname, '../public/index.html'),
      hash: true,
      alwaysWriteToDisk: true
    }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};

module.exports = config;