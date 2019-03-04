import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StudentFormDialog } from '../components';
import { fetchSingleStudent, updateStudent } from '../reducers/studentsReducer';
import { fetchCampuses } from '../reducers/campusesReducer';
import { css } from 'react-emotion';
import { GridLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
import PropTypes from 'prop-types';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  withStyles,
  Button,
} from '@material-ui/core';
const styles = theme => ({
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    minWidth: 500,
    maxWidth: 800,
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
});

class SingleStudent extends Component {
  constructor(props) {
    super(props);
    this.handleCampusClick = this.handleCampusClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchSingleStudent(
      this.props.match.params.studentId,
      this.props.history
    );
  }
  handleCampusClick(campusId) {
    this.props.history.push(`/campuses/${campusId}`);
  }
  render() {
    const { classes, student } = this.props;
    return (
      <React.Fragment>
        {!student.id ? (
          <React.Fragment>
            <h3>Loading Student...</h3>
            <GridLoader
              className={override}
              sizeUnit="px"
              size={25}
              color="green"
              loading={true}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <StudentFormDialog action="Update" type="Student" {...this.props} />
            <Grid container justify="center">
              <Grid item>
                <Card className={classes.card} justify="center">
                  <CardContent className={classes.cardContent}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      align="center"
                    >
                      {student.firstName} {student.lastName}
                    </Typography>
                    <CardMedia
                      className={classes.cardMedia}
                      image={student.imageUrl}
                      title={`${student.name}-Image`}
                      align="center"
                    />
                    <Typography gutterBottom align="left">
                      Email: {student.email}
                    </Typography>

                    <Typography gutterBottom align="left">
                      GPA:{' '}
                      {student.gpa !== null ? student.gpa.toFixed(2) : 'N/A'}
                    </Typography>
                    <Typography>
                      Campus:{' '}
                      {student.campus ? (
                        <Button
                          onClick={() =>
                            this.handleCampusClick(student.campusId)
                          }
                          variant="outlined"
                          color="secondary"
                        >
                          {student.campus.name}
                        </Button>
                      ) : (
                        'Not Currently Enrolled'
                      )}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    student: state.students.selectedStudent,
    campuses: state.campuses.campuses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleStudent: (studentId, history) =>
      dispatch(fetchSingleStudent(studentId, history)),
    fetchCampuses: () => dispatch(fetchCampuses()),
    putStudent: (updatedStudent, studentId) =>
      dispatch(updateStudent(updatedStudent, studentId)),
  };
};

SingleStudent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SingleStudent)
);
