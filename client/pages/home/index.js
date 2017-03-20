import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
  <h1>The brand new Dragon Drop, powered by apollo graphql!</h1>
  <Link to="projects">Projects</Link>
  </div>
);

export default Home;