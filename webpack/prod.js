const webpack = require('webpack');
const pxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      "presets": ["react", "es2015", "stage-0"]
    }
  }, {
    test: /\.json$/,
    exclude: /node_modules/,
    loaders: ['json-loader']
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css!postcss')
  },
  {
    test: /\.less/,
    loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
  }
];


const config = {

  resolve: {
    extensions: ['', '.web.js', '.js', '.jsx']
  },
  entry: './src/client.js',

  output: {
    path: './dist/js',
    publicPath: '/dist/js/',
    filename: '[name].min.js',
    chunkFilename: '[name].min.js'
  },

  module: {
    loaders: loaders
  },

  postcss: [pxtorem({
    rootValue: 100,
    propWhiteList: []
  }), autoprefixer()],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    })
  ]
};
module.exports = config;