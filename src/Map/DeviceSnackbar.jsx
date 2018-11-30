import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {withSnackbar} from 'notistack';


const styles = {
    root: {
        flexGrow: 1,
        display: 'flex',
        margin: 16,
        justifyContent: 'center',
        alignItems: 'middle',
    },
};

const buttons = [
    {variant: 'success', message: '42:42:42:42:42:42 is connected', color: 'rgb(111, 191, 115)'},
    {variant: 'error', message: '42:42:42:42:42:42 is disconnected', color: 'rgb(237, 75, 130)'},
];

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
                this.props.enqueueSnackbar(buttons[0].message, {variant: buttons[0].variant});
            },
            1000
        );
        timerID.error = setInterval(
            () => {
                window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
                this.props.enqueueSnackbar(buttons[1].message, {variant: buttons[1].variant});
            },
            1000
        )
    }

    render() {
        return (
            null
        );
    }
}

DeviceSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
};

export default withStyles(styles)(
    withSnackbar(DeviceSnackbar),
);