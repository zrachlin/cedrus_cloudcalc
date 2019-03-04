import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Typography } from '@material-ui/core';
import { fetchEvaluation } from '../reducers/calculationsReducer';
class NewCalculation extends Component {
  constructor(props) {
    super(props);
    this.state = { expression: '', label: '', result: '' };
  }
  componentDidUpdate(prevProps) {
    const oldSelectedExpression = prevProps.selectedExpression;
    const { selectedExpression } = this.props;
  }
  handleChange = evt => {
    this.setState({ [evt.target.id]: evt.target.value });
  };
  handleEvaluation = async evt => {
    evt.preventDefault();
    await this.props.fetchEvaluation(this.state.expression);
  };

  render() {
    const { result } = this.props;
    return (
      <React.Fragment>
        <TextField
          margin="dense"
          fullWidth
          required={true}
          autoFocus
          id="label"
          label="Calculation Label"
          type="text"
          value={this.state.label}
          onChange={this.handleChange}
        />
        <TextField
          margin="dense"
          fullWidth
          required={true}
          id="expression"
          label="Expression"
          type="text"
          value={this.state.expression}
          onChange={this.handleChange}
        />
        {result !== '' && result !== undefined ? (
          <Typography>Result: {result}</Typography>
        ) : null}
        <Button onClick={this.handleEvaluation} color="primary">
          Evaluate!
        </Button>
        <Button onClick={this.handleSubmit} color="primary">
          Save!
        </Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    result: state.calculations.currentResult,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEvaluation: expression => dispatch(fetchEvaluation(expression)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCalculation);
