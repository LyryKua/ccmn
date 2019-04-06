import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Line } from 'react-chartjs-2';

const styles = () => ({
  paper: {
    height: 430,
  },
});

const BarGraph = (props) => {
  const { classes } = props;
  const data = {
    labels: props.labels,
    datasets: props.datasets,
  };

  return (
    <Paper className={classes.paper}>
      <Line
        data={data}
        options={{ maintainAspectRatio: false }}
      />
    </Paper>
  );
};

export default withStyles(styles)(BarGraph);
