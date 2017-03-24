import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import LoadingPage from '../../components/LoadingPage';

class Form extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      project: {
        id: '',
        name: '',
        description: ''
      },
      saving: false
    };
  }

  parseIdentifier = name => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
  }

  update = name => e => {
    if (name === 'id') {
      const value = this.parseIdentifier(e.target.value);
      this.setState(update(this.state, { project: { id: { $set: value } } }));
    } else {
      this.setState(update(this.state, {
        project: { [name]: { $set: e.target.value } }
      }));
    }
  }

  submit = e => {
    e.preventDefault();
    this.setState({ saving: true });
    this.props.createProject(this.state.project).then(() => {
      this.setState({ project: { name: '', description: '' }, saving: false });
    });
  }

  render() {
    const { project: { id, name, description }, saving } = this.state;
    return saving ? <LoadingPage /> : (
      <form onSubmit={this.submit}>
        <label>
          Project Name
          <input type="text" onChange={this.update('name')} value={name} />
        </label>
        <label>
          Project ID
          <input type="text" onChange={this.update('id')} value={id} />
        </label>
        <label>
          Description
          <input type="text" onChange={this.update('description')} value={description} />
        </label>
        <button>Create Project</button>
      </form>
    );
  }
}

const mutation = gql`mutation CreateProject($project: ProjectInput!) {
  createProject(project: $project) {
    id
    name
    pages {
      id
      title
      path
    }
  }
}
`;

export default graphql(mutation, {
  props: ({ ownProps, mutate }) => ({
    createProject: (project) => mutate({
      variables: { project },
      updateQueries: {
        Projects: (prev, { mutationResult }) => {
          const newProject = mutationResult.data.createProject;
          return update(prev, {
            projects: {
              $push: [newProject]
            }
          });
        }
      }
    })
  })
})(Form);