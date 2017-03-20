import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import styles from './styles.css';

const Sidebar = ({ match, pages }) => (
  <div className={styles.sidebar}>
    <ul>
      {pages.map(page => (
        <li key={page.id}>
          <NavLink
            to={`${match.url}/pages${page.path}`}
            exact
            className={styles.link}
            activeClassName={styles.active}
          >
            {page.title}
          </NavLink>
        </li>
      ))}
      <li>
        <NavLink
          to={`${match.url}/new-page`}
          exact
          className={styles.link}
          activeClassName={styles.active}
        >
          New Page
        </NavLink>
      </li>
    </ul>
  </div>
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

export default withRouter(Sidebar);