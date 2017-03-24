'use strict';
const path = require('path');
const express = require('express');
const graphqlExpress = require('graphql-server-express').graphqlExpress;
const bodyParser = require('body-parser');

const schema = require('./data');
const Project = require('./models/Project');

const app = express();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/projects/:projectId', function(req, res) {
  const template = data => `
  <!doctype html>
  <html>
    <head>
      <title>Sample App</title>
      <script>
        ${data}
      </script>
    </head>
    <body>
      <div id='root'>
      </div>
      <script src="https://storage.googleapis.com/dragon-drop-graphql-cdn/site.min.js"></script>
    </body>
  </html>
  `;
  console.log(template);
  console.log(req.params)
  Project({ id: req.params.projectId }).dataFile().then(data => {
    const html = template(data);
    console.log(html);
    res.contentType = 'text/html';
    res.send(html);
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static(path.join(__dirname, 'static')));
} else {
  const devServer = require('./utils/devServer');
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
