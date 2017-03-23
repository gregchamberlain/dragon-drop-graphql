import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Page from './Page';

const pages = window.__PROJECT_DATA__.project.pages;

const App = () => pages.length ? (
  <Router>
    <div>
      {pages.map(page => (
        <Link key={page.id} to={page.path}>{page.title}</Link>
      ))}
      <Switch>
        {pages.map(page => (
          <Route key={page.id} exact path={page.path} component={() => <Page page={page} />} />
        ))}
        <Route component={() => <div><h3>Page not found :( <small><Link to="/">Go Home</Link></small></h3></div>}/>
      </Switch>

    </div>
  </Router>
) : (
  <h1>This site is in progress, check back later! :)</h1>
);

export default App;