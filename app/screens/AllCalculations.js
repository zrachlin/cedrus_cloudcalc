import React, { Component } from 'react';
// import { connect } from 'react-redux';
import axios from 'axios';
// import {
//   fetchStudents,
//   deleteStudent,
//   postNewStudent,
// } from '../reducers/studentsReducer';
// import { fetchCampuses } from '../reducers/campusesReducer';
import { CalculationsTable, styles } from '../components';

import { css } from 'react-emotion';
import { PacmanLoader } from 'react-spinners';
import { Typography, withStyles } from '@material-ui/core';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class AllCalculations extends Component {
  constructor(props) {
    super(props);
    this.state = { calculations: [] };
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/calculations');
      this.setState({ calculations: data });
    } catch (error) {
      console.error(error);
    }
  }

  handleClick = evt => {
    // return this.props.history.push(`/students/${studentId}`);
    console.log('clicked', evt);
  };

  render() {
    const { calculations } = this.state;
    return (
      <React.Fragment>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
        >
          Calculations
        </Typography>
        {!calculations.length ? (
          <React.Fragment>
            <h3>Loading Past Calculations... nom,nom,nom</h3>
            <PacmanLoader
              className={override}
              sizeUnit="px"
              size={50}
              color="green"
              loading={true}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* <StudentFormDialog action="Create" type="Student" {...this.props} /> */}
            <CalculationsTable
              calculations={calculations}
              handleClick={this.handleClick}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     students: state.students.students,
//     campuses: state.campuses.campuses,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchStudents: () => dispatch(fetchStudents()),
//     fetchCampuses: () => dispatch(fetchCampuses()),
//     deleteStudent: studentId => dispatch(deleteStudent(studentId)),
//     postStudent: newStudent => dispatch(postNewStudent(newStudent)),
//   };
// };

export default withStyles(styles)(AllCalculations);
