const path = require('path');
const webpack = require('webpack');
const express = require('express');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const graphiqlExpress = require('graphql-server-express').graphiqlExpress;


const compiler = webpack(config);

function devServer(app) {
  app.use(devMiddleware(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    stats: {
        colors: true
    },
  }));

  app.use(hotMiddleware(compiler));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));
}


module.exports = devServer;