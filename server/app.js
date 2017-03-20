'use strict';
const path = require('path');
const express = require('express');
const graphqlExpress = require('graphql-server-express').graphqlExpress;
const bodyParser = require('body-parser');

const schema = require('./data');
const devServer = require('./utils/devServer');

const app = express();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static(path.join(__dirname, 'static')));
} else {
  devServer(app);
}

app.use('/graphql', bodyParser.json(), (req, res, next) => {
  return graphqlExpress({
    schema: schema,
    context: { req, res }
  })(req, res, next);
});

app.get('/', (req, res) => {
  res.status(200).send('Taco party!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END app]
