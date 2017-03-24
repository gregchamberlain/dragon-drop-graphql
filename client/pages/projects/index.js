import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import LoadingPage from '../../components/LoadingPage';
import Form from './Form';

const Projects = ({ data }) => data.loading ? <LoadingPage /> : (
  <div style={{ display: 'flex' }}>
    {data.projects.map(project => (
      <Link to={`/projects/${project.id}`} key={project.id} style={{ padding: 20, border: '1px solid #444', margin: 10 }}>
        {project.name}
      </Link>
    ))}
    <div style={{ padding: 20, border: '1px solid #444', margin: 10 }}>
      <Form />
    </div>
  </div>
);

const query = gql`query Projects {
  projects {
    id
    name
    pages {
      id
      title
      path
    }
  }
}`;

export default graphql(query)(Projects);