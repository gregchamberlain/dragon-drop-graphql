import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import LayoutEditor from './LayoutEditor';

const Editor = ({ data, updatePage }) => data.loading ? <h1>Loading Page...</h1> : (
  <LayoutEditor items={data.page.items} update={updatePage} />
);

const query = gql`query Page($id: String!) {
  page(id: $id) {
    id
    title
    path
    items
  }
}`;

const mutation = gql`mutation UpdatePage($page: PageInput!) {
  updatePage(page: $page) {
    id
    title
    path
    items
  }
}`;

export default compose(
  graphql(query, {
    options: ({ match }) => ({ variables: { id: `${match.params.projectId}@/${match.params.pageId || ''}` } }),
  }),
  graphql(mutation, {
    props: ({ ownProps, mutate }) => ({
      updatePage: (items) => mutate({
        variables: { page: Object.assign({}, ownProps.data.page, { items, __typename: undefined }) },
        updateQueries: {
        Project: (prev, { mutationResult }) => {
          const newPage = mutationResult.data.updatePage;
          if (prev.project.id !== ownProps.match.params.projectId) return prev;
          return update(prev, {
            project: {
              pages: {
                $apply: pages => pages.map(page => page.id === newPage.id ? newPage : page)
              }
            }
          });
        },
        Page: (prev, { mutationResult }) => {
          const newPage = mutationResult.data.updatePage;
          if (prev.page.id !== newPage.id) return prev;
          return newPage;
        }
      }
      })
    })
  })
)(Editor);