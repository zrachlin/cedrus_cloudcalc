import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchStudents,
  deleteStudent,
  postNewStudent,
} from '../reducers/studentsReducer';
import { fetchCampuses } from '../reducers/campusesReducer';
import { StudentsTable, StudentFormDialog, styles } from '../components';

import { css } from 'react-emotion';
import { PacmanLoader } from 'react-spinners';
import { Typography, withStyles } from '@material-ui/core';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class AllStudents extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchStudents();
  }

  handleClick(studentId) {
    return this.props.history.push(`/students/${studentId}`);
  }

  render() {
    return (
      <React.Fragment>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
        >
          Students
        </Typography>
        {!this.props.students.length ? (
          <React.Fragment>
            <h3>Loading Students... nom,nom,nom</h3>
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
            <StudentFormDialog action="Create" type="Student" {...this.props} />
            <StudentsTable
              students={this.props.students}
              includeCampus={true}
              deleteStudent={this.props.deleteStudent}
              handleClick={this.handleClick}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.students.students,
    campuses: state.campuses.campuses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStudents: () => dispatch(fetchStudents()),
    fetchCampuses: () => dispatch(fetchCampuses()),
    deleteStudent: studentId => dispatch(deleteStudent(studentId)),
    postStudent: newStudent => dispatch(postNewStudent(newStudent)),
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllStudents)
);
