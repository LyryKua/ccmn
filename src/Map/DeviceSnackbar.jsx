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


class DeviceSnackbar extends Component {
    componentDidMount() {
        buttons.map(button => (
            setInterval(
                () => {
                    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
                    this.props.enqueueSnackbar(button.message, {variant: button.variant});
                },
                1000
            )
        ))

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