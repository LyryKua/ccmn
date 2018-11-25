import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';


import TimePicker from './TimePicker';
// import MyCard from '../MyCard';
// import GuttersGrid from './GuttersGrid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
});

class Analytics extends Component {
    render() {
        // const {classes} = this.props;

        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <TimePicker/>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Analytics);
