import React from 'react';
import {
  Typography,
  Grid,
  Paper,
  withStyles
} from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 150,
    padding: theme.spacing.unit * 2,
  },
});

const Card = (props) => {
  const {
    color: backgroundColor,
    classes,
    icon,
    data,
    title
  } = props;

  return (
    <Paper className={classes.root} style={{ background: backgroundColor }}>
      <Grid container spacing={16}>
        <Grid item>
          {icon}
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
              <Typography
                variant="subtitle1"
                align="right"
              >
                {data}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                variant="h5"
                gutterBottom
                align="right"
              >
                {title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withStyles(styles)(Card);
