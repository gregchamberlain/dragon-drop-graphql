import React, { Component } from 'react';
import { Layout, LayoutState } from 'react-layout-core';
import DnD from 'react-layout-plugin-dnd';
import Edit from 'react-layout-plugin-edit';

const getColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};

const newItem = () => ({ type: 'div', props: { style: { minHeight: 30, backgroundColor: getColor() } }, children: [] })

class LayoutEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layoutState: new LayoutState(props.items)
    };
  }

  componentWillReceiveProps(props) {
    if (props.items !== this.props.items) {
      this.setState({ layoutState: new LayoutState(props.items) });
    }
  }

  layoutChange = layoutState => {
    this.setState({ layoutState });
  }

  addItem = () => {
    let { layoutState } = this.state;
    layoutState = layoutState.insertOrMoveItem('root', 0, newItem());
    this.setState({ layoutState });
  }

  update = e => {
    this.props.update(this.state.layoutState.toRaw()).then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.addItem}>Add Item</button>
        <button onClick={this.update}>Save</button>
        <Layout 
          layoutState={this.state.layoutState}
          onChange={this.layoutChange}
          components={{}}
          plugins={[Edit, DnD]}
        />
      </div>
    );
  }
}

export default LayoutEditor;