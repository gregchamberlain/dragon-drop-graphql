import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Page from './Page';

const pages = window.__PROJECT_DATA__.project.pages;

const App = () => (
  <Router>
    <div>
      {pages.map(page => (
        <Link key={page.id} to={page.path}>{page.title}</Link>
      ))}
      {pages.map(page => (
        <Route key={page.id} exact path={page.path} component={() => <Page page={page} />} />
      ))}
    </div>
  </Router>
);

export default App;