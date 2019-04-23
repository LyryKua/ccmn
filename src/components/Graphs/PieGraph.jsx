import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Pie } from 'react-chartjs-2';

const styles = () => ({
  paper: {
    height: 430,
  },
});

const PieGraph = (props) => {
  const { classes, datasets } = props;
  const data = {
    labels: Object.keys(datasets[0].data),
    datasets,
  };

  return (
    <Paper className={classes.paper}>
      <Pie
        data={data}
        options={{ maintainAspectRatio: false }}
      />
    </Paper>
  );
};

export default withStyles(styles)(PieGraph);
