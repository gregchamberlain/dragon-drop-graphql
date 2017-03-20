var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: './src/index.js',

  output: {
    filename: 'site.min.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },

  devtool: 'cheap-module-inline-source-map',

  module: {
    rules: [{
      test: /\.js?$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    })
  ]
  
};