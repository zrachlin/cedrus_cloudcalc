import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Navbar, styles } from './components';

import { Home, AllCalculations } from './screens';

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
          <Route
            path="/calculations"
            render={renderProps => <AllCalculations {...renderProps} />}
          />
          <Route path="/home" component={Home} />
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
