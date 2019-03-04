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

function StudentsTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Toolbar>
        <Typography variant="h6" id="tableTitle">
          Students
        </Typography>
      </Toolbar>
      <Table className={classes.table} justify="center">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            {props.includeCampus ? <TableCell>Campus</TableCell> : null}
            {props.deleteStudent ? <TableCell /> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.students
            .sort((a, b) => a.id - b.id)
            .map(student => {
              return (
                <TableRow key={student.id} hover={true}>
                  <TableCell
                    component="th"
                    scope="row"
                    onClick={() => props.handleClick(student.id)}
                  >
                    {student.firstName}
                  </TableCell>
                  <TableCell onClick={() => props.handleClick(student.id)}>
                    {student.lastName}
                  </TableCell>
                  {props.includeCampus ? (
                    <TableCell onClick={() => props.handleClick(student.id)}>
                      {student.campus ? student.campus.name : 'Not Enrolled'}
                    </TableCell>
                  ) : null}
                  {props.deleteStudent ? (
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={() => props.deleteStudent(student.id)}
                      >
                        Delete
                        <DeleteIcon className={classes.rightIcon} />
                      </Button>
                    </TableCell>
                  ) : null}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Paper>
  );
}

StudentsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentsTable);
