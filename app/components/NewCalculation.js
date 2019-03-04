import React, { Component } from 'react';

class NewCalculation extends Component {
  constructor(props) {
    super(props);
    this.state = { expression: '', label: '', result: '' };
  }
  componentDidUpdate(prevProps) {
    const oldSelectedExpression = prevProps.selectedExpression;
    const { selectedExpression } = this.props;
  }
  render() {
    return <h1>hi</h1>;
  }
}

export default NewCalculation;
