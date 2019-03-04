import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleCampus, updateCampus } from '../reducers/campusesReducer';
import { StudentsTable, CampusFormDialog } from '../components';

import { css } from 'react-emotion';
import { ClimbingBoxLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  withStyles,
} from '@material-ui/core';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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

class SingleCampus extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleCampus(
      this.props.match.params.campusId,
      this.props.history
    );
  }

  handleClick(studentId) {
    return this.props.history.push(`/students/${studentId}`);
  }
  render() {
    const { classes, campus } = this.props;
    return (
      <React.Fragment>
        {!this.props.campus.name ? (
          <React.Fragment>
            <h3>Loading Campus...</h3>
            <ClimbingBoxLoader
              className={override}
              sizeUnit="px"
              size={25}
              color="green"
              loading={true}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <CampusFormDialog type="Campus" action="Update" {...this.props} />
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
                      {campus.name}
                    </Typography>
                    <CardMedia
                      className={classes.cardMedia}
                      image={campus.imageUrl}
                      title={`${campus.name}-Image`}
                      align="center"
                    />
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h3"
                      align="left"
                    >
                      Address: {campus.address}
                    </Typography>
                    {campus.description ? (
                      <React.Fragment>
                        <Typography
                          gutterBottom
                          align="left"
                          variant="h5"
                          component="h3"
                        >
                          Description:{' '}
                        </Typography>
                        <Typography gutterBottom>
                          {campus.description}
                        </Typography>
                      </React.Fragment>
                    ) : null}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <React.Fragment>
              {campus.students && campus.students.length ? (
                <StudentsTable
                  students={this.props.campus.students}
                  includeCampus={false}
                  handleClick={this.handleClick}
                />
              ) : (
                <Typography variant="h6" align="center" color="textSecondary">
                  No Students Enrolled!
                </Typography>
              )}
            </React.Fragment>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    campus: state.campuses.selectedCampus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleCampus: (campusId, history) =>
      dispatch(fetchSingleCampus(campusId, history)),
    putCampus: (updatedCampus, campusId) =>
      dispatch(updateCampus(updatedCampus, campusId)),
  };
};

SingleCampus.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SingleCampus)
);
