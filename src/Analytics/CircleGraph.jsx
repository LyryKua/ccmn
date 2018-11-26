import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Polar, Doughnut, Pie } from 'react-chartjs-2';

const styles = theme => ({
    paper: {
        height: 430,
        // width: 100,
    },
});

const arr = () => Array.from({length: 3}, () => Math.floor(Math.random() * 15 + 5));

const labels = ['Passerby', 'Visitors', 'Connected'];
const backgroundColor = ['rgba(76, 175, 80, 0.2)', 'rgba(233, 30, 99, 0.2)', 'rgba(33, 150, 243, 0.2)'];
const borderColor = ['rgba(76, 175, 80, 1)', 'rgba(233, 30, 99, 1)', 'rgba(33, 150, 243, 1)'];
const hoverBackgroundColor = ['rgba(76, 175, 80, 0.5)', 'rgba(233, 30, 99, 0.5)', 'rgba(33, 150, 243, 0.5)'];
const datasets = Array.from({length: 1}, (v, index) => ({
    data: arr(),
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    borderWidth: 1,
    hoverBackgroundColor: hoverBackgroundColor,
    label: 'test',
}));

console.log(arr());

class CircleGraph extends Component {
    render() {
        const {classes} = this.props;
        const data = {
            labels: labels,
            datasets: datasets,
        };
        return (
            <Paper className={classes.paper}>
                <Pie data={data} options={{maintainAspectRatio: false}}/>
            </Paper>
        );
    }
}

export default withStyles(styles)(CircleGraph);
