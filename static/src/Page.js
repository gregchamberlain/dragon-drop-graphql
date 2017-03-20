import React, { Component } from 'react';
import { Layout, LayoutState } from 'react-layout-core';

class Page extends Component {

  constructor(props) {
    super(props);
    document.title= props.page.title;
    this.state = {
      layoutState: new LayoutState(props.page.items)
    };
  }

  componentWillReceiveProps(props) {
    if (props.page.items !== this.props.page.items) {
      this.setState({ layoutState: new LayoutState(props.page.items) });
    }
    if (props.page.title !== this.props.page.title) {
      document.title = props.page.title;
    }
  }

  render() {
    return (
      <Layout
        layoutState={this.state.layoutState}
        components={{}}
      />
    );
  }

}

export default Page;