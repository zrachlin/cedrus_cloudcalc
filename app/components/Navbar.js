import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Toolbar, AppBar, Button, withStyles } from '@material-ui/core';
import styles from './styles';
import PropTypes from 'prop-types';

const Navbar = props => {
  const { classes } = props;
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/home"
        >
          Home
        </Button>
        <Button
          component={Link}
          to="/calculations"
          disabled={props.location.pathname === '/calculations'}
          variant={
            props.location.pathname === '/calculations' ? 'outlined' : null
          }
        >
          All Calculations
        </Button>
        {/* <Button
          component={Link}
          to="/students"
          disabled={props.location.pathname === '/students'}
          variant={props.location.pathname === '/students' ? 'outlined' : null}
        >
          Students
        </Button> */}
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Navbar));
