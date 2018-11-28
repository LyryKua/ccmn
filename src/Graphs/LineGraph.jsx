import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Line} from 'react-chartjs-2';

const styles = theme => ({
    paper: {
        height: 430,
        // width: 100,
    },
});

class BarGraph extends Component {
    render() {

        const {classes} = this.props;

        const data = {
            labels: this.props.labels,
            datasets: this.props.datasets,
        };

        return (
            <Paper className={classes.paper}>
                <Line
                    data={data}
                    options={{maintainAspectRatio: false}}
                />
            </Paper>
        );
    }
}

export default withStyles(styles)(BarGraph);
