import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Projects = ({ data }) => data.loading ? <h1>Loading...</h1> : (
  <div style={{ display: 'flex' }}>
    {data.projects.map(project => (
      <Link to={`/projects/${project.id}`} key={project.id} style={{ padding: 20, border: '1px solid #444', margin: 10 }}>
        {project.name}
      </Link>
    ))}
  </div>
);

const query = gql`query Projects {
  projects {
    id
    name
  }
}`;

export default graphql(query)(Projects);