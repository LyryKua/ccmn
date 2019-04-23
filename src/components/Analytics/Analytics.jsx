// TODO: The card with peakHour should show a day

import React, { Component } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import RangePicker from '../RangePicker';
import Card from './Card';
import { Grid, Paper, Typography, withStyles } from '@material-ui/core';
import {
  MonetizationOn as MonetizationOnIcon,
  Person as PersonIcon,
  Poll as PollIcon,
  Timelapse as TimelapseIcon,
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
    proximityTail: '/hourly',

    cards: {
      totalVisitors: null,
      averageDwellTime: null,
      peakHour: { hour: null, date: null },
      conversionRate: null,
    },
    proximity: {
      passerby: null,
      visitor: null,
      connected: null,
    },
    proximityDistribution: {
      totalPasserbyCount: null,
      totalVisitorCount: null,
      totalConnectedCount: null,
    },
  };

  fetchCardsDataAndProximityDistribution() {
    return CISCO_PRESENCE
      .get('/api/presence/v1/kpisummary', {
        params: {
          ...this.state.range,
          siteId: this.props.siteId,
        },
      })
      .then(response => {
        const key = response.data['peakSummary'] ? 'peakSummary' : 'peakWeekSummary';
        const peakHour = {
          hour: response.data[key]['peakHour'],
          date: response.data[key]['peakDate'],
        };
        return {
          cards: {
            peakHour,
            totalVisitors: response.data['visitorCount'],
            averageDwellTime: response.data['averageDwell'],
            conversionRate: response.data['conversionRate'],
          },
          proximityDistribution: {
            totalPasserbyCount: response.data['totalPasserbyCount'],
            totalVisitorCount: response.data['totalVisitorCount'],
            totalConnectedCount: response.data['totalConnectedCount'],
          },
        };
      })
      .catch(e => console.error(e));
  }

  fetchProximity() {
    const passerby = CISCO_PRESENCE
      .get(`/api/presence/v1/passerby${this.state.proximityTail}`, {
        params: {
          ...this.state.range,
          siteId: this.props.siteId,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(e => console.error(e));

    const visitor = CISCO_PRESENCE
      .get(`/api/presence/v1/visitor${this.state.proximityTail}`, {
        params: {
          ...this.state.range,
          siteId: this.props.siteId,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(e => console.error(e));

    const connected = CISCO_PRESENCE
      .get(`/api/presence/v1/connected${this.state.proximityTail}`, {
        params: {
          ...this.state.range,
          siteId: this.props.siteId,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(e => console.error(e));

    return Promise.all([passerby, visitor, connected]);
  }

  handleChangeDate(start, end) {
    const startDate = moment(start).format('YYYY-MM-DD');
    const endDate = moment(end).format('YYYY-MM-DD');
    this.setState({
      range: startDate === endDate ? { date: startDate } : { startDate, endDate },
      proximityTail: startDate === endDate ? '/hourly' : '/daily',
    }, () => this.updateData());
  }

  updateData() {
    Promise.all([
      this.fetchCardsDataAndProximityDistribution(),
      this.fetchProximity(),
    ]).then(data => {
      this.setState({
        cards: data[0].cards,
        proximityDistribution: data[0].proximityDistribution,
      });
      this.setState({
        proximity: {
          passerby: Object.values(data[1][0]),
          visitor: Object.values(data[1][1]),
          connected: Object.values(data[1][2]),
        },
      });
    });
  }

  componentDidMount() {
    this.updateData();
  }

  render() {
    const { classes } = this.props;
    const { cards, proximity, proximityDistribution } = this.state;

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
            datasets={graphData.barProximityDatasets(proximity.passerby, proximity.visitor, proximity.connected)} />
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h6" gutterBottom>
            Proximity Distribution
          </Typography>
          <PieGraph
            datasets={graphData.pieProximityDatasets(
              proximityDistribution.totalPasserbyCount,
              proximityDistribution.totalVisitorCount,
              proximityDistribution.totalConnectedCount,
            )}
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
