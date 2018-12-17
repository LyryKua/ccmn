import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import PieGraph from '../Graphs/PieGraph';
import LineGraph from '../Graphs/LineGraph';

import {addDays} from 'date-fns';

import {Calendar} from 'react-date-range';
import * as loremData from "../Analytics/graphData";


const styles = theme => ({
    paper: {
        textAlign: 'center',
        height: 430,
    },
});

class Prediction extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            datePicker: addDays(new Date(), 1),
            color: '#3f51b5',
        };
    }

    handleChange(which, payload) {
        console.log(which, payload);
        this.setState({
            [which]: payload,
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={32}
            >
                <Grid item xs={7}>
                    <Paper className={classes.paper}>
                        <Calendar
                            date={this.state.datePicker}
                            onChange={this.handleChange.bind(this, 'datePicker')}
                            className={'PreviewArea'}
                            color={this.state.color}
                            months={2}
                            direction="horizontal"
                            minDate={addDays(new Date(), 1)}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <PieGraph
                        // datasets={loremData.pieRepeatVisitorsDatasets}
                        // labels={loremData.pieRepeatVisitorsLabels}
                    />
                </Grid>
                <Grid item xs={12}>
                    <LineGraph
                        datasets={loremData.lineDwellTimeDatasets}
                        labels={loremData.lineDwellTimeLabels}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Prediction);
