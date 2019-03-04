import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Navbar, NotFound, styles } from './components';

import {
  Home,
  AllStudents,
  AllCampuses,
  SingleCampus,
  SingleStudent,
} from './screens';

import PropTypes from 'prop-types';

import { Typography, CssBaseline, withStyles } from '@material-ui/core';

const Routes = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      <main>
        <Switch>
          {/* <Route
            path="/campuses/:campusId"
            render={renderProps => <SingleCampus {...renderProps} />}
          />
          <Route path="/students/:studentId" component={SingleStudent} />
          <Route path="/campuses" component={AllCampuses} />
          <Route
            path="/students"
            render={renderProps => <AllStudents {...renderProps} />}
          /> */}
          <Route path="/home" component={Home} />
          {/* <Route path="/page-not-found/:type/:id" component={NotFound} /> */}
          <Redirect to="/home" />
        </Switch>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Created By Zach Rachlin
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          (Material-UI used for theme)
        </Typography>
      </footer>
    </React.Fragment>
  );
};

Routes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Routes));
