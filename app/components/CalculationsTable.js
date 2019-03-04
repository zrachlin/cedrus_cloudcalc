import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Toolbar,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles';

function CalculationsTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Toolbar>
        <Typography variant="h6" id="tableTitle">
          Calculations
        </Typography>
      </Toolbar>
      <Table className={classes.table} justify="center">
        <TableHead>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell>Expression</TableCell>
            <TableCell>Result</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.calculations
            .sort((a, b) => a.id - b.id)
            .map(calculation => {
              return (
                <TableRow key={calculation.id} hover={true}>
                  <TableCell
                    component="th"
                    scope="row"
                    onClick={() => props.handleClick(calculation.id)}
                  >
                    {calculation.label}
                  </TableCell>
                  <TableCell onClick={() => props.handleClick(calculation.id)}>
                    {calculation.expression}
                  </TableCell>

                  <TableCell onClick={() => props.handleClick(calculation.id)}>
                    {calculation.result}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={() => props.deleteCalculation(calculation.id)}
                    >
                      Delete
                      <DeleteIcon className={classes.rightIcon} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CalculationsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CalculationsTable);
