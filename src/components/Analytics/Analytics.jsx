import React, { Component } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import MyCard from './MyCard';
import cards from './cards';
import {
  Grid,
  Paper,
  Typography,
  withStyles
} from '@material-ui/core';
import BarGraph from '../Graphs/BarGraph';
import PieGraph from '../Graphs/PieGraph';
import LineGraph from '../Graphs/LineGraph';
import * as graphData from './graphData';

const styles = {
  paper: {
    textAlign: 'center'
  },
};

class Analytics extends Component {
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
      endDate: payload.selection.endDate,
      startDate: payload.selection.startDate,
    });
  }

  render() {
    const { classes } = this.props;
    const {
      averageDwellByLevels,
      totalVisitorCount,
      totalConnectedCount,
      totalPasserbyCount,
      repeatVisitors,
      passerby,
      visitor,
      connected,
      dwellTime,
    } = this.state;
    const lengthOfGraphLabels = new Date().getHours();

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={32}
      >
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <DateRangePicker
              onChange={this.handleRangeChange.bind(this, 'dateRangePicker')}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={3}
              ranges={[ this.state.dateRangePicker.selection ]}
              direction="horizontal"
              maxDate={new Date()}
            />
          </Paper>
        </Grid>
        {
          cards.map(card => (
            <Grid item xs={3}>
              <MyCard {...card}/>
            </Grid>
          ))
        }
        <Grid item xs={7}>
          <Typography variant="h6" gutterBottom>
            Proximity
          </Typography>
          <BarGraph
            datasets={graphData.barProximityDatasets(passerby, visitor, connected)}
            labels={graphData.barProximityLabels.slice(0, lengthOfGraphLabels)}
          />
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h6" gutterBottom>
            Proximity Distribution
          </Typography>
          <PieGraph
            datasets={graphData.pieProximityDatasets(totalPasserbyCount, totalVisitorCount, totalConnectedCount)}
            labels={graphData.pieProximityLabels}
          />
        </Grid>
        <Grid item xs={7}>
          <Typography variant="h6" gutterBottom>
            Dwell Time
          </Typography>
          <LineGraph
            datasets={graphData.lineDwellTimeDatasets(dwellTime)}
            labels={graphData.lineDwellTimeLabels.slice(0, lengthOfGraphLabels)}
          />
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h6" gutterBottom>
            Dwell Time Distribution
          </Typography>
          <PieGraph
            datasets={graphData.pieDwellTimeDatasets(averageDwellByLevels)}
            labels={graphData.pieDwellTimeLabels}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Repeat Visitors
          </Typography>
          <LineGraph
            datasets={graphData.lineRepeatVisitorsDatasets(repeatVisitors)}
            labels={graphData.lineRepeatVisitorsLabels.slice(0, lengthOfGraphLabels)}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Analytics);
