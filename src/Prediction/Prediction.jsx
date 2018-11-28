import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import {Calendar} from 'react-date-range';


class Prediction extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            datePickerInternational: null,
        };
    }

    handleSelect(which, payload) {
        console.log(which, payload);
        this.setState({
            [which]: payload,
        });
    }

    render() {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={32}
            >
                <Grid item xs={12}>
                    <Calendar
                        date={new Date()}
                        onChange={this.handleSelect}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default Prediction;
