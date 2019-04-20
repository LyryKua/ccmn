// TODO: The card with peakHour should show a day

import React, { Component } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import RangePicker from '../RangePicker';
import Card from './Card';
import {
  Grid,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  Person as PersonIcon,
  Poll as PollIcon,
  Timelapse as TimelapseIcon,
  MonetizationOn as MonetizationOnIcon,
} from '@material-ui/icons';
import BarGraph from '../Graphs/BarGraph';
import PieGraph from '../Graphs/PieGraph';
import LineGraph from '../Graphs/LineGraph';
import * as graphData from './graphData';
import { CISCO_PRESENCE } from '../../api/http';
import moment from 'moment';

const styles = {
  paper: {
    textAlign: 'center',
  },
};

class Analytics extends Component {
  state = {
    range: {
      // startDate, endDate
      date: moment().format('YYYY-MM-DD'),
    },
    isLoading: false,
    isLoaded: false,
    cards: {
      totalVisitors: null,
      averageDwellTime: null,
      peakHour: { hour: null, date: null },
      conversionRate: null,
    },
    // TODO: will continue here
    proximity: null,
    error: null,
  };

  fetchCardsData() {
    CISCO_PRESENCE
      .get('/api/presence/v1/kpisummary', {
        params: {
          ...this.state.range,
          siteId: this.props.siteId,
        },
      })
      .then(response => {
        const key = response.data[ 'peakSummary' ] ? 'peakSummary' : 'peakWeekSummary';
        const peakHour = {
          hour: response.data[ key ][ 'peakHour' ],
          date: response.data[ key ][ 'peakDate' ],
        };
        const cards = {
          peakHour,
          totalVisitors: response.data[ 'visitorCount' ],
          averageDwellTime: response.data[ 'averageDwell' ],
          conversionRate: response.data[ 'conversionRate' ],
        };
        this.setState({ cards });
      })
      .catch(e => console.error(e));
  }

  handleChangeDate(start, end) {
    const startDate = moment(start).format('YYYY-MM-DD');
    const endDate = moment(end).format('YYYY-MM-DD');
    this.setState({
      range: startDate === endDate ? { date: startDate } : { startDate, endDate },
    });
    this.fetchCardsData();
  }

  componentDidMount() {
    this.fetchCardsData();
  }

  render() {
    const { classes } = this.props;
    const { cards } = this.state;
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
            <RangePicker onChange={this.handleChangeDate.bind(this)} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Card
            title={'Total Visitors'}
            data={cards.totalVisitors}
            icon={
              <PersonIcon
                fontSize={'large'}
                style={{ fontSize: '90px' }}
              />
            }
            color={'#6fbf73'}
          />
        </Grid>
        <Grid item xs={3}>
          <Card
            title={'Average Dwell Time'}
            data={cards.averageDwellTime}
            icon={
              <PollIcon
                fontSize={'large'}
                style={{ fontSize: '90px' }}
              />
            }
            color={'#ed4b82'}
          />
        </Grid>
        <Grid item xs={3}>
          <Card
            title={'Peak Hour'}
            data={cards.peakHour.hour}
            icon={
              <TimelapseIcon
                fontSize={'large'}
                style={{ fontSize: '90px' }}
              />
            }
            color={'#4dabf5'}
          />
        </Grid>
        <Grid item xs={3}>
          <Card
            title={'Conversion Rate'}
            data={cards.conversionRate}
            icon={
              <MonetizationOnIcon
                fontSize={'large'}
                style={{ fontSize: '90px' }}
              />
            }
            color={'#ffcd38'}
          />
        </Grid>
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
        {/*<Grid item xs={7}>*/}
          {/*<Typography variant="h6" gutterBottom>*/}
            {/*Dwell Time*/}
          {/*</Typography>*/}
          {/*<LineGraph*/}
            {/*datasets={graphData.lineDwellTimeDatasets(dwellTime)}*/}
            {/*labels={graphData.lineDwellTimeLabels.slice(0, lengthOfGraphLabels)}*/}
          {/*/>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={5}>*/}
          {/*<Typography variant="h6" gutterBottom>*/}
            {/*Dwell Time Distribution*/}
          {/*</Typography>*/}
          {/*<PieGraph*/}
            {/*datasets={graphData.pieDwellTimeDatasets(averageDwellByLevels)}*/}
            {/*labels={graphData.pieDwellTimeLabels}*/}
          {/*/>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={12}>*/}
          {/*<Typography variant="h6" gutterBottom>*/}
            {/*Repeat Visitors*/}
          {/*</Typography>*/}
          {/*<LineGraph*/}
            {/*datasets={graphData.lineRepeatVisitorsDatasets(repeatVisitors)}*/}
            {/*labels={graphData.lineRepeatVisitorsLabels.slice(0, lengthOfGraphLabels)}*/}
          {/*/>*/}
        {/*</Grid>*/}
      </Grid>
    );
  }
}

export default withStyles(styles)(Analytics);
