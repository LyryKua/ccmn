import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Doughnut, Bar } from 'react-chartjs-2';

const styles = theme => ({
    paper: {
        height: 430,
        // width: 100,
    },
});
const arr = () => Array.from({length: 16}, () => Math.floor(Math.random() * 16));
const labels = [
    '12am-1am',
    '1am-2am',
    '2am-3am',
    '3am-4am',
    '4am-5am',
    '6am-7am',
    '7am-8am',
    '8am-9am',
    '9am-10am',
    '10am-11am',
    '11am-12pm',
    '12pm-1pm',
    '11am-12pm',
    '1pm-2pm',
    '2pm-3pm',
    '3pm-4pm',
];
const label = ['Passerby', 'Visitors', 'Connected'];
const backgroundColor = ['rgba(76, 175, 80, 0.2)', 'rgba(233, 30, 99, 0.2)', 'rgba(33, 150, 243, 0.2)'];
const borderColor = ['rgba(76, 175, 80, 1)', 'rgba(233, 30, 99, 1)', 'rgba(33, 150, 243, 1)'];
const hoverBackgroundColor = ['rgba(76, 175, 80, 0.5)', 'rgba(233, 30, 99, 0.5)', 'rgba(33, 150, 243, 0.5)'];
const datasets = Array.from({length: 3}, (v, index) => ({
    label: label[index % 3],
    backgroundColor: backgroundColor[index % 3],
    borderColor: borderColor[index % 3],
    borderWidth: 1,
    hoverBackgroundColor: hoverBackgroundColor[index % 3],
    data: arr()
}));

class ColumnGraph extends Component {
    render() {

        const {classes} = this.props;

        const data = {
            labels: labels,
            datasets: datasets,
        };

        return (
            <Paper className={classes.paper}>
                <Bar data={data} options={{maintainAspectRatio: false}}/>
            </Paper>
        );
    }
}

export default withStyles(styles)(ColumnGraph);
