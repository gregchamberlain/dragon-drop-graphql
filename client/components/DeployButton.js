import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';
import { withRouter } from 'react-router-dom';

const DeployButton = ({ deploy }) => (
  <button onClick={deploy}>Deploy Site</button>
);

const mutation = gql`mutation DeployProject($projectId: String!) {
  deployProject(projectId: $projectId)
}
`;

export default graphql(mutation, {
  props: ({ ownProps, mutate }) => ({
    deploy: (page) => mutate({
      variables: { projectId: ownProps.projectId },
    })
  })
})(DeployButton);