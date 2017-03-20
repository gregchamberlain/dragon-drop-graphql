import React from 'react';
import { Route, Link } from 'react-router-dom';

import Home from './pages/home';
import Projects from './pages/projects';
import Project from './pages/projects/show';

const App = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/projects">Projects</Link></li>
    </ul>

    <hr/>

    <Route exact path="/" component={Home}/>
    <Route exact path="/projects" component={Projects}/>
    <Route path="/projects/:projectId" component={Project} />
  </div>
);

export default App;