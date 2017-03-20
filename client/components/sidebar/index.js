import React from 'react';
import { withRouter } from 'react-router-dom';

export Sidebar from './Sidebar';
import styles from './styles.css';

const SidebarLayout = ({ children }) => (
  <div className={styles.layout}>
    {children}
  </div>
);

export default SidebarLayout;