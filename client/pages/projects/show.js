import React from 'react';
import { Route } from 'react-router-dom'; 
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ToolbarLayout, { Toolbar, Content } from '../../components/toolbar';
import SidebarLayout, { Sidebar } from '../../components/sidebar';
import LoadingPage from '../../components/LoadingPage';
import PageForm from '../pages/Form';
import LayoutEditor from '../../components/LayoutEditor';

const Project = ({ match, data }) => data.loading ? <LoadingPage /> : (
  <ToolbarLayout>
    <Toolbar />
    <Content>
      <SidebarLayout>
        <Sidebar pages={data.project.pages} />
        <Content>
          <Route path={match.path} component={(props) => <h1>{props.match.params.projectId}</h1>} />
          <Route path={`${match.path}/new-page`} component={PageForm}/>
          <Route path={`${match.path}/pages/:pageId`} component={LayoutEditor} />
          <Route exact path={`${match.path}/pages/`} component={LayoutEditor} />
        </Content>
      </SidebarLayout>
    </Content>
  </ToolbarLayout>
);

const query = gql`query Project($id: String!) {
  project(id: $id) {
    id
    name
    pages {
      id
      title
      path
      items
    }
  }
}
`;

export default graphql(query, {
  options: ({ match }) => ({ variables: { id: match.params.projectId } }),
})(Project);