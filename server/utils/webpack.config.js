var path = require('path');
var webpack = require('webpack');

module.exports = {

  devtool: 'cheap-module-source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?http://localhost:3000',
    '../client/index.js'
  ],

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'static'),
    publicPath: '/static/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  module: {
    rules: [{
      test: /\.js?$/,
      use: {
        loader: 'babel-loader',
        options: {
          "presets": ["es2015", "stage-0", "react"],
          "env": {
            "development": {
              "plugins": ["react-hot-loader/babel"]
            }
          }
        }
      },
      exclude: /node_modules/
    }]
  },
};