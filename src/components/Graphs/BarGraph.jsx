import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Bar } from 'react-chartjs-2';

const styles = {
  paper: {
    height: 430,
  },
};

// TODO: change labels for graph
const BarGraph = (props) => {
  const { classes, datasets } = props;
  const data = {
    datasets,
    labels: Array(datasets[0].data.length).fill('42'),
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
