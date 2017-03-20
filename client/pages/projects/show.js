import React from 'react';

const Project = ({ match }) => (
  <div>
    {match.params.projectId}
  </div>
);

export default Project;