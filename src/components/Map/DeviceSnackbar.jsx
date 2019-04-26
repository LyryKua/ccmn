import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

const styles = {
  root: {
    flexGrow: 1,
    display: 'flex',
    margin: 16,
    justifyContent: 'center',
    alignItems: 'middle',
  },
};

const alphabet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];

const getLetter = () => `${alphabet[Math.floor((Math.random() * 15))]}`;

const genHex = () => `${getLetter()}${getLetter()}`;

const genMacAddress = () => `${genHex()}:${genHex()}:${genHex()}:${genHex()}:${genHex()}:${genHex()}`;

let timerID = {
  success: null,
  error: null,
};

class DeviceSnackbar extends Component {
  componentWillUnmount() {
    clearInterval(timerID.success);
    clearInterval(timerID.error);
  }

  componentDidMount() {
    timerID.success = setInterval(
      () => {
        window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
        this.props.enqueueSnackbar(`${genMacAddress()} is connected`, { variant: 'success' });
      },
      Math.floor((Math.random() * 400) + 2300),
    );
    timerID.error = setInterval(
      () => {
        window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
        this.props.enqueueSnackbar(`${genMacAddress()} is disconnected`, { variant: 'error' });
      },
      Math.floor((Math.random() * 400) + 1900),
    )
  }

  render() {
    return null;
  }
}

export default withStyles(styles)(withSnackbar(DeviceSnackbar));