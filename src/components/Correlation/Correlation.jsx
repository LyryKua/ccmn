import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { DateRangePicker } from 'react-date-range';
import { withStyles } from '@material-ui/core/styles';
import BarGraph from '../Graphs/BarGraph';
import PieGraph from '../Graphs/PieGraph';

import * as loremData from '../Analytics/graphData';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center'
  },
});

class Correlation extends Component {
  state = {
    dateRangePicker: {
      selection: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
        color: '#3f51b5',
      },
    },
  };

  handleRangeChange(which, payload) {
    // DO NOT DELETE NEXT ROW
    console.log(which, payload);
    this.setState({
      [ which ]: {
        ...this.state[ which ],
        ...payload,
      },
    });
  }

  render() {
    const { classes } = this.props;
    // console.log(loremData.barProximityDatasets);

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={32}
      >
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <DateRangePicker
              onChange={this.handleRangeChange.bind(this, 'rangePicker')}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              className={'PreviewArea'}
              months={3}
              ranges={[ this.state.dateRangePicker.selection ]}
              direction="horizontal"
              maxDate={new Date()}
            />
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="h6" gutterBottom>
            Proximity
          </Typography>
          <BarGraph
            datasets={loremData.barProximityDatasets()}
            labels={loremData.barProximityLabels}
          />
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h6" gutterBottom>
            Proximity Distribution
          </Typography>
          <PieGraph
            datasets={loremData.pieProximityDatasets()}
            labels={loremData.pieProximityLabels}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Correlation);
