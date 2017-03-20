import React from 'react';
import { Route, Link } from 'react-router-dom';

import Home from './pages/home';
import Projects from './pages/projects';
import Project from './pages/projects/show';

const App = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto' }}>
    <Route exact path="/" component={Home}/>
    <Route exact path="/projects" component={Projects}/>
    <Route path="/projects/:projectId" component={Project} />
  </div>
);

export default App;