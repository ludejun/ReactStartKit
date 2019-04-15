/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
// const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
  entry: {
    main: './src/client.js',
    // vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, '../release'),
    filename: '[name].[chunkhash].js',
    // 如使用CDN
    // publicPath: "http://cdn.example.com/assets/[hash]/"
    // 如有使用import()动态加载的代码打包
    chunkFilename: '[name].bundle.js',
  },

  module: {
    rules: loaders
  },

  mode: 'production',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CleanWebpackPlugin(['release'], { root: path.join(__dirname, '..') }),
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
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     warnings: false,
    //     screw_ie8: true,
    //   },
    // }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new BundleAnalyzerPlugin({analyzerPort: 5593})
  ],

  // // 防止将某个模块打包到bundle中，如从CDN引入react而不是将它打包
  // externals: {
  //   react: 'react',
  // },

  // 当包体积过大时(超250kb)，将展示一条错误(警告)
  performance: {
    maxAssetSize: 1000000,
    hints: 'warning',
  },

  // 类似CommonsChunkPlugin拆分公共代码
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          // filename: '[name].bundle.js'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};

module.exports = config;
