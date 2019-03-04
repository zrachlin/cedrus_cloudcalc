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
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styles from './styles';

class CampusFormDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      name: '',
      address: '',
      description: '',
      imageUrl: '',
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  handleChange = name => evt => {
    this.setState({ [name]: evt.target.value });
  };
  // eslint-disable-next-line complexity
  async handleSubmit(evt) {
    evt.preventDefault();
    const { action } = this.props;
    const { name, address, description, imageUrl } = this.state;
    const campusObj = Object.assign(
      {},
      name ? { name } : null,
      address ? { address } : null,
      description ? { description } : null,
      imageUrl ? { imageUrl } : null
    );
    try {
      //needed to make this async-await to be able to catch the error
      if (Object.keys(campusObj).length) {
        action === 'Create'
          ? await this.props.postCampus(campusObj)
          : await this.props.putCampus(campusObj, this.props.campus.id);
        this.setState({
          name: '',
          address: '',
          description: '',
          imageUrl: '',
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
            <TextField
              required={action === 'Create' ? true : null}
              autoFocus
              margin="dense"
              id="name"
              label="Campus Name"
              type="text"
              value={this.state.name}
              fullWidth
              onChange={this.handleChange('name')}
            />
            <TextField
              required={action === 'Create' ? true : null}
              margin="dense"
              id="address"
              label="Campus Address"
              type="address"
              value={this.state.address}
              fullWidth
              onChange={this.handleChange('address')}
            />
            <TextField
              multiline
              rowsMax="10"
              margin="dense"
              id="description"
              label="Campus Description"
              type="text"
              value={this.state.description}
              fullWidth
              onChange={this.handleChange('description')}
            />
            <TextField
              margin="dense"
              id="imageUrl"
              label="Campus Image URL (Leave blank for default image)"
              type="url"
              value={this.state.imageUrl}
              fullWidth
              onChange={this.handleChange('imageUrl')}
            />
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
CampusFormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CampusFormDialog);
