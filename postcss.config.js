module.exports = {
  // sourceMap: false,
  // options: {
  //   plugins: (loader) => [
  //     // require('postcss-smart-import'),
  //     require('autoprefixer')({browsers: ['> 5%', 'last 2 versions']}),
  //   ]
  // }
  plugins: [
    require('autoprefixer')({browsers: ['> 5%', 'last 2 versions']})
  ]
};
