import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import LayoutEditor from './LayoutEditor';
import LoadingPage from '../LoadingPage';

const Editor = ({ data, updatePage }) => data.loading ? <LoadingPage /> : (
  <LayoutEditor items={data.page.items} update={updatePage} />
);

const query = gql`query Page($projectId: String!, $id: String!) {
  page(projectId: $projectId, id: $id) {
    id
    title
    path
    items
  }
}`;

const mutation = gql`mutation UpdatePage($projectId: String!, $page: PageInput!) {
  updatePage(projectId: $projectId, page: $page) {
    id
    title
    path
    items
  }
}`;

export default compose(
  graphql(query, {
    options: ({ match }) => ({ variables: { projectId: match.params.projectId, id: match.params.pageId } }),
  }),
  graphql(mutation, {
    props: ({ ownProps, mutate }) => ({
      updatePage: (items) => mutate({
        variables: { projectId: ownProps.match.params.projectId, page: Object.assign({}, ownProps.data.page, { items, __typename: undefined }) },
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