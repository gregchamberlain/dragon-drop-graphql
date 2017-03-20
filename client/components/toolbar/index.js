import React from 'react';

import styles from './styles.css';

const ToolbarLayout = ({ children }) => (
  <div className={styles.layout}>
    {children}
  </div>
);

export const Toolbar = ({ children }) => (
  <div className={styles.toolbar}>
    {children}
  </div>
);

export const Content = ({ children, ...props }) => (
  <div className={styles.content} {...props} >
    {children}
  </div>
);

export default ToolbarLayout;