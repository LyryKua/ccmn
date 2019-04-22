import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Bar } from 'react-chartjs-2';
import { barProximityLabels } from '../../components/Analytics/graphData';

const styles = {
  paper: {
    height: 430,
  },
};

// TODO: change labels for graph
const BarGraph = (props) => {
  const { classes, datasets } = props;
  // console.log(datasets);
  const data = {
    datasets,
    // labels: Array(datasets[0].data.length).fill(42).map((element, index) => index),
    labels: Array(datasets[0].data.length).fill('42'),
    // labels: barProximityLabels.slice(0, datasets[0].data.length),
  };

  return (
    <Paper className={classes.paper}>
      <Bar
        data={data}
        options={{ maintainAspectRatio: false }}
      />
    </Paper>
  );
};

export default withStyles(styles)(BarGraph);
