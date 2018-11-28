import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Pie } from 'react-chartjs-2';

const styles = theme => ({
    paper: {
        height: 430,
        // width: 100,
    },
});

class PieGraph extends Component {
    render() {
        const {classes} = this.props;
        const data = {
            labels: this.props.labels,
            datasets: this.props.datasets,
        };
        return (
            <Paper className={classes.paper}>
                <Pie data={data} options={{maintainAspectRatio: false}}/>
            </Paper>
        );
    }
}

export default withStyles(styles)(PieGraph);
