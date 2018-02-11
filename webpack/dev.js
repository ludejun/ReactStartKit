const path = require('path');
const webpack = require('webpack');
// const middleware = require('webpack-dev-middleware');
const autoprefixer = require('autoprefixer');
const webpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = {
  hot_server_host: 'localhost',
  hot_server_port: 5591
};

const loaders = [
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


const config = {
  resolve: {
    extensions: ['.web.js', '.js', '.jsx']
  },

  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${env.hot_server_host}:${env.hot_server_port}`,
    'webpack/hot/only-dev-server',
    './src/client.js'
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: 'http://' + env.hot_server_host + ':' + env.hot_server_port + '/'
  },

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
    new HtmlWebpackPlugin({
      title: 'ReactStartKit',
      inject: 'body',
      minify: false,
      template: path.join(__dirname, '../public/index.html'),
      alwaysWriteToDisk: true
    }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  // Options affecting the normal modules
  module: {
    loaders: loaders
  },

  devtool: 'inline-source-map'
};

// module.exports = config;

const options = {
  contentBase: path.join(__dirname, '../dist'),
  compress: true,
  port: env.hot_server_port,
  inline: true,
  hot: true,
  // publicPath: 'http://' + env.hot_server_host + ':' + env.hot_server_port + '/'
};
// webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);
server.listen(env.hot_server_port, env.hot_server_host, () => {
  console.log('dev server listening on port ' + env.hot_server_port);
});
