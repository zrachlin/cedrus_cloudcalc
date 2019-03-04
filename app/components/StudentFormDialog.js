import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styles from './styles';

class StudentFormDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      gpa: '',
      campusId: '',
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    this.props.fetchCampuses();
  }

  handleClickOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  handleChange = name => evt => {
    const val =
      name === 'campusId' ? Number(evt.target.value) : evt.target.value;
    this.setState({ [name]: val });
  };
  // eslint-disable-next-line complexity
  async handleSubmit(evt) {
    evt.preventDefault();
    const { action } = this.props;
    const { firstName, lastName, email, imageUrl, gpa, campusId } = this.state;
    const studentObj = Object.assign(
      {},
      firstName ? { firstName } : null,
      lastName ? { lastName } : null,
      email ? { email } : null,
      imageUrl ? { imageUrl } : null,
      gpa ? { gpa } : null,
      campusId ? { campusId } : null
    );
    try {
      //needed to make this async-await to be able to catch the error
      if (Object.keys(studentObj).length) {
        action === 'Create'
          ? await this.props.postStudent(studentObj)
          : await this.props.putStudent(studentObj, this.props.student.id);
        this.setState({
          firstName: '',
          lastName: '',
          email: '',
          imageUrl: '',
          gpa: '',
          campusId: 'Select a Campus',
          open: false,
        });
      }
    } catch (err) {
      alert(err.response.data);
    }
  }

  render() {
    const { classes, action, type } = this.props;
    return (
      <React.Fragment>
        {action === 'Create' ? (
          <Fab
            className={classes.fab}
            variant="extended"
            color="primary"
            onClick={this.handleClickOpen}
          >
            <AddIcon />
            New {type}
          </Fab>
        ) : (
          <Fab
            className={classes.fab}
            variant="extended"
            color="primary"
            onClick={this.handleClickOpen}
          >
            Update {type}
          </Fab>
        )}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {action} {type}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill in the following fields to {action.toLowerCase()} the{' '}
              {type.toLowerCase()}.
            </DialogContentText>
            <form className={classes.container}>
              <TextField
                required={action === 'Create' ? true : null}
                autoFocus
                margin="dense"
                id="firstName"
                label="First Name"
                type="text"
                className={classes.textField}
                value={this.state.firstName}
                fullWidth
                onChange={this.handleChange('firstName')}
              />
              <TextField
                required={action === 'Create' ? true : null}
                margin="dense"
                id="lastName"
                label="Last Name"
                type="text"
                className={classes.textField}
                value={this.state.lastName}
                fullWidth
                onChange={this.handleChange('lastName')}
              />
              <TextField
                required={action === 'Create' ? true : null}
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                className={classes.textField}
                value={this.state.email}
                fullWidth
                onChange={this.handleChange('email')}
              />
              <TextField
                margin="dense"
                id="imageUrl"
                label="Student Image URL (Leave blank for default image)"
                type="url"
                className={classes.textField}
                value={this.state.imageUrl}
                fullWidth
                onChange={this.handleChange('imageUrl')}
              />
              <InputLabel className={classes.inputLabel} htmlFor="campusId">
                Campus
              </InputLabel>
              <Select
                width="20"
                margin="dense"
                value={this.state.campusId}
                type="text"
                className={classes.select}
                onChange={this.handleChange('campusId')}
                inputProps={{
                  name: 'campusId',
                  id: 'campusId',
                }}
              >
                <MenuItem value="">
                  <em>Select a Campus</em>
                </MenuItem>
                {this.props.campuses.map(campus => (
                  <MenuItem key={campus.id} value={campus.id}>
                    {campus.name}
                  </MenuItem>
                ))}
              </Select>
              {/* <InputLabel className={classes.inputLabel} htmlFor="gpa">
                GPA
              </InputLabel> */}
              <TextField
                id="gpa"
                label="GPA"
                value={this.state.gpa}
                onChange={this.handleChange('gpa')}
                type="number"
                className={classes.textField}
                margin="normal"
                InputProps={{ inputProps: { min: 0, max: 4, step: 0.01 } }}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              {action}!
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
StudentFormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentFormDialog);
