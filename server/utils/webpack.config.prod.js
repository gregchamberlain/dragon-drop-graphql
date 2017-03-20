var path = require('path');
var webpack = require('webpack');

module.exports = {

  devtool: 'cheap-module-source-map',

  entry: '../client/index.js',

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../static'),
    publicPath: '/static/'
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
    },{
      test: /\.css$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
      ],
    },{
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: { loader: 'graphql-tag/loader' }
    }]
  },
};