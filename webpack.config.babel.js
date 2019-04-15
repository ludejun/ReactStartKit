/* eslint-disable */
// import constants from './src/configs';
// const constants = require('./src/configs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

const constants = {name: 'ReactStart', version: '1.0.0'};
const isDev = process.env.NODE_ENV === 'development';
console.log(111111, isDev);

const config = {
  // context: path.resolve(__dirname),
  // 如entry为字符串或字符串数组，chunk会被命名为main。如传入一个对象，则每个键值会是chunk的名称
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, isDev ? 'dist' : 'release'),
    // 如果配置多个entry入口，或者使用CommonsChunkPlugin这样的插件，应使用[name]占位符
    // 为了防止静态资源被缓存，将打包输出加入 文件内容hash（chunkhash）的标示
    filename: '[name].[chunkhash].js',
    // 如使用CDN
    // publicPath: "http://cdn.example.com/assets/[hash]/"
    // 如有使用import()动态加载的代码打包
    chunkFilename: '[name].bundle.js',
  },
  // 可以在CLI参数中传递
  // mode: 'development',

  module: {},

  // 在import引入文件路径的别名
  alias: {
    '@utils': path.resolve(__dirname, 'src/utils/'),
  },
  // 自动解析确定的扩展，使用户在引入模块时不带扩展
  resolve: {
    extensions: ['.web.js', '.js', '.jsx'],
  },

  plugins: [
    // 打包分析
    new BundleAnalyzerPlugin({analyzerPort: 5592}),
  ],

  // 防止将某个模块打包到bundle中，如从CDN引入react而不是将它打包
  externals: {
    react: 'react',
  },

  // 当包体积过大时(超250kb)，将展示一条错误
  performance: {
    hints: 'error',
  },
};

if (isDev) {
  config.plugins.push([
    new CleanWebpackPlugin(['dist']),
    webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: constants.name,
    }),
  ]);
  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 5591,
    hot: true,
    open: true,
  };
  config.devtool = 'inline-source-map';
  config.module.rules = [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        "react-hot-loader/webpack",
        "babel-loader",
      ],
    }, {
      test: /\.json$/,
      exclude: /node_modules/,
      use: ['json-loader']
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    },
    {
      test: /\.less$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader']
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: ['file-loader']
    }
  ];
} else {
  config.plugins.push([
    new CleanWebpackPlugin(['release']),
    new HtmlWebpackPlugin({
      title: constants.name,
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
        collapseInlineTagWhitespace: true,
      },
      template: path.join(__dirname, '../public/index.html'),
      hash: true,
      alwaysWriteToDisk: true,
    }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name].min.css'),
    // mode为production自动uglify
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     warnings: false,
    //     screw_ie8: true,
    //   },
    // })
  ]);
  config.module.rules = [
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
}

console.log(2222222, config);
module.export = config;
