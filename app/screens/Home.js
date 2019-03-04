import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { styles, NewCalculation } from '../components';
import AllCalculations from './AllCalculations';
import {
  Typography,
  CssBaseline,
  Grid,
  Button,
  withStyles,
} from '@material-ui/core';

class Home extends Component {
  render() {
    const { classes } = props;
    return (
      <React.Fragment>
        <CssBaseline />
        {/* {Hero Unit} */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Welcome to CloudCalc!
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              Enter a new expression below:
            </Typography>
            <NewCalculation />
            {/* <div className={classes.heroButtons}>
            <Grid container spacing={16} justify="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/calculations"
                >
                  Hero Button 1
                </Button>
              </Grid>
            </Grid>
          </div> */}
          </div>
        </div>
        {/* {End of Hero} */}
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Click any of the past expressions to add it to your new expression
        </Typography>
        <AllCalculations {...props} home={true} />
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
