import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 150,
    padding: theme.spacing.unit * 2,
  },
});

class MyCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} style={{ background: this.props.color }}>
        <Grid container spacing={16}>
          <Grid item>
            {this.props.icon}
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography
                  variant="subtitle1"
                  align="right"
                >
                  {this.props.data}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="right"
                >
                  {this.props.title}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

MyCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyCard);