const path = require('path');
const webpack = require('webpack');
const pxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');
const webpackDevServer = require('webpack-dev-server');

const env = {
  hot_server_host: '127.0.0.1',
  hot_server_port: 5591
};

const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      "presets": ["react", "es2015", "stage-0", "react-hmre"]
    }
  }, {
    test: /\.json$/,
    exclude: /node_modules/,
    loader: 'json'
  },
  {
    test: /\.css$/,
    loader: 'style!css!postcss'
  },
  {
    test: /\.less$/,
    loader: 'style!css!postcss!less'
  }
];


const config = {

  resolve: {
    extensions: ['', '.web.js', '.js', '.jsx']
  },

  entry: [
    'webpack-dev-server/client?http://' + env.hot_server_host + ':' + env.hot_server_port,
    'webpack/hot/dev-server',
    './src/client.js'
  ],
  output: {
    path: path.join(__dirname, '/public/build/js'),
    filename: '[name].js',
    publicPath: 'http://' + env.hot_server_host + ':' + env.hot_server_port + '/'
  },

  devtool: "eval",

  // What information should be printed to the console
  stats: {
    colors: true
  },

  // The list of plugins for Webpack compiler
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  // Options affecting the normal modules
  module: {
    loaders: loaders
  },

  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  postcss: [
    pxtorem({
      rootValue: 100,
      propWhiteList: []
    }),
    autoprefixer()
  ]
};

const compiler = webpack(config);
const server = new webpackDevServer(compiler, {
  inline: true,
  hot: true
});
server.listen(env.hot_server_port);