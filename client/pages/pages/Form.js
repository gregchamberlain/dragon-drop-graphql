import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

class Form extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      page: {
        title: '',
        path: ''
      },
      saving: false
    };
  }

  update = name => e => {

    this.setState(update(this.state, {
      page: { [name]: { $set: e.target.value } }
    }));
  }

  submit = e => {
    e.preventDefault();
    this.setState({ saving: true });
    this.props.createPage(this.state.page).then(() => {
      this.setState({ page: { title: '', path: '' }, saving: false });
    });
  }

  render() {
    const { page: { title, path }, saving } = this.state;
    return saving ? <h1>Creating Page...</h1> : (
      <form onSubmit={this.submit}>
        <label>
          Title
          <input type="text" onChange={this.update('title')} value={title} />
        </label>
        <label>
          Path
          <input type="text" onChange={this.update('path')} value={path} />
        </label>
        <button>Create Page</button>
      </form>
    );
  }
}

const mutation = gql`mutation CreatePage($projectId: String!, $page: PageInput!) {
  createPage(projectId: $projectId, page: $page) {
    id
    title
    path
    items
  }
}
`;

export default graphql(mutation, {
  props: ({ ownProps, mutate }) => ({
    createPage: (page) => mutate({
      variables: { projectId: ownProps.match.params.projectId, page },
      updateQueries: {
        Project: (prev, { mutationResult }) => {
          const newPage = mutationResult.data.createPage;
          if (prev.project.id !== ownProps.match.params.projectId) return prev;
          return update(prev, {
            project: {
              pages: {
                $push: [newPage]
              }
            }
          });
        }
      }
    })
  })
})(Form);