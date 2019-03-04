import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchCampuses,
  deleteCampus,
  postNewCampus,
} from '../reducers/campusesReducer';

import { CampusFormDialog, styles } from '../components';
import { css } from 'react-emotion';
import { RingLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import classNames from 'classnames';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

import {
  Typography,
  CssBaseline,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  withStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

class AllCampuses extends Component {
  componentDidMount() {
    this.props.fetchCampuses();
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
        >
          Campuses
        </Typography>
        {!this.props.campuses.length ? (
          <React.Fragment>
            <h3>Loading Campuses...</h3>
            <RingLoader
              className={override}
              sizeUnit="px"
              size={50}
              color="green"
              loading={true}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            {this.props.home ? null : (
              <CampusFormDialog action="Create" type="Campus" {...this.props} />
            )}
            <div className={classNames(classes.layout, classes.cardGrid)} />
            <Grid container spacing={40}>
              {this.props.campuses.map(campus => (
                <Grid item key={campus.id} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={campus.imageUrl}
                      title={`${campus.name}-Image`}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {campus.name}
                      </Typography>
                      {campus.description ? (
                        <Typography gutterBottom>
                          {campus.description.split('.')[0]}
                        </Typography>
                      ) : (
                        <Typography gutterBottom />
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/campuses/${campus.id}`}
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={() => this.props.deleteCampus(campus.id)}
                      >
                        Delete
                        <DeleteIcon className={classes.rightIcon} />
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    campuses: state.campuses.campuses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCampuses: () => dispatch(fetchCampuses()),
    deleteCampus: campusId => dispatch(deleteCampus(campusId)),
    postCampus: newCampus => dispatch(postNewCampus(newCampus)),
  };
};

AllCampuses.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllCampuses)
);
