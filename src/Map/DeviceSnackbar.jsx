import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
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
    handleClick = button => () => {
        // Avoid material-ui warnings. more info: https://material-ui.com/style/typography/#migration-to-typography-v2
        window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
        this.props.enqueueSnackbar(button.message, {variant: button.variant, backgroundColor: button.color});
    };

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
                {buttons.map(button => (
                    <Button
                        key={button.variant}
                        variant="contained"
                        className={classNames(classes.button, classes[button.variant])}
                        onClick={this.handleClick(button)}
                    >
                        {button.variant}
                    </Button>
                ))}
            </Paper>
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