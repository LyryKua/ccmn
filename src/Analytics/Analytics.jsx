import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {DateRangePicker} from 'react-date-range';
import MyCard from './MyCard';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/Person';
import PollIcon from '@material-ui/icons/Poll';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Typography from '@material-ui/core/Typography';
import BarGraph from '../Graphs/BarGraph';
import PieGraph from '../Graphs/PieGraph';
import LineGraph from '../Graphs/LineGraph';
import moment from 'moment';

// TODO: replace *
import * as graphData from './graphData';
import {HTTPPRESENCE} from "../api/http";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    icon: {
        fontSize: "90px",
    },
    paper: {
        textAlign: 'center'
    },
});

class Analytics extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            dateRangePicker: {
                selection: {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection',
                    color: '#3f51b5',
                },
            },
        };
    }

    handleRangeChange(which, payload) {
        // DO NOT DELETE NEXT ROW
        console.log(which, payload);
        const {siteId} = this.props;
        this.setState({
            [which]: {
                ...this.state[which],
                ...payload,
            },
            endDate: payload.selection.endDate,
            startDate: payload.selection.startDate,
        });
        if (moment(payload.selection.startDate).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') && moment(payload.selection.endDate).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
            // today
            console.log("today");
            HTTPPRESENCE.get("/api/presence/v1/kpisummary/today", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        averageDwell: response.data.averageDwell,
                        peakHour: response.data.peakSummary.peakHour,
                        conversionRate: response.data.conversionRate,
                        totalConnectedCount: response.data.totalConnectedCount,
                        totalPasserbyCount: response.data.totalPasserbyCount,
                        totalVisitorCount: response.data.totalVisitorCount,
                        visitorCount: response.data.visitorCount,
                        averageDwellByLevels: response.data.averageDwellByLevels,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/repeatvisitors/hourly/today", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        repeatVisitors: response.data,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/passerby/hourly/today", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        passerby: response.data,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/visitor/hourly/today", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        visitor: response.data,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/connected/hourly/today", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        connected: response.data,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/dwell/hourly", {
                params: {
                    siteId: siteId,
                    date: moment().format('YYYY-MM-DD')
                }
            })
                .then(response => {
                    this.setState({
                        dwellTime: response.data,
                    })
                });
        } else if (moment(payload.selection.startDate).format('YYYY-MM-DD') === moment().subtract(1, "days").format('YYYY-MM-DD') && moment(payload.selection.endDate).format('YYYY-MM-DD') === moment().subtract(1, "days").format('YYYY-MM-DD')) {
            // yesterday
            console.log("yesterday");
            HTTPPRESENCE.get("/api/presence/v1/kpisummary/yesterday", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        averageDwell: response.data.averageDwell,
                        peakHour: response.data.peakSummary.peakHour,
                        conversionRate: response.data.conversionRate,
                        totalConnectedCount: response.data.totalConnectedCount,
                        totalPasserbyCount: response.data.totalPasserbyCount,
                        totalVisitorCount: response.data.totalVisitorCount,
                        visitorCount: response.data.visitorCount,
                        averageDwellByLevels: response.data.averageDwellByLevels,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/repeatvisitors/hourly/yesterday", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        repeatVisitors: response.data,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/passerby/hourly/yesterday", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        passerby: response.data,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/visitor/hourly/yesterday", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        visitor: response.data,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/connected/hourly/yesterday", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        connected: response.data,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/dwell/hourly", {
                params: {
                    siteId: siteId,
                    date: moment().subtract(1, "days").format('YYYY-MM-DD'),
                }
            })
                .then(response => {
                    this.setState({
                        dwellTime: response.data,
                    })
                });
        } else {
            // custom
            HTTPPRESENCE.get("/api/presence/v1/kpisummary", {
                params: {
                    siteId: siteId,
                    startDate: moment(payload.selection.startDate).subtract(1, "days").format('YYYY-MM-DD'),
                    endDate: moment(payload.selection.endDate).subtract(1, "days").format('YYYY-MM-DD'),
                }
            })
                .then(response => {
                    this.setState({
                        averageDwell: response.data.averageDwell,
                        peakHour: false,
                        conversionRate: response.data.conversionRate,
                        totalConnectedCount: response.data.totalConnectedCount,
                        totalPasserbyCount: response.data.totalPasserbyCount,
                        totalVisitorCount: response.data.totalVisitorCount,
                        visitorCount: response.data.visitorCount,
                        averageDwellByLevels: response.data.averageDwellByLevels,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/repeatvisitors/hourly/yesterday", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        repeatVisitors: response.data,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/passerby/hourly/yesterday", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        passerby: response.data,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/visitor/hourly/yesterday", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        visitor: response.data,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/connected/hourly/yesterday", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        connected: response.data,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/dwell/hourly", {
                params: {
                    siteId: siteId,
                    date: moment().subtract(1, "days").format('YYYY-MM-DD'),
                }
            })
                .then(response => {
                    this.setState({
                        dwellTime: response.data,
                    })
                });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {siteId} = this.props;
        if (prevProps.siteId !== siteId) {
            HTTPPRESENCE.get("/api/presence/v1/kpisummary/today", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        averageDwell: response.data.averageDwell,
                        peakHour: response.data.peakSummary.peakHour,
                        conversionRate: response.data.conversionRate,
                        totalConnectedCount: response.data.totalConnectedCount,
                        totalPasserbyCount: response.data.totalPasserbyCount,
                        totalVisitorCount: response.data.totalVisitorCount,
                        visitorCount: response.data.visitorCount,
                        averageDwellByLevels: response.data.averageDwellByLevels,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/repeatvisitors/hourly/today", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        repeatVisitors: response.data,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/passerby/hourly/today", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        passerby: response.data,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/visitor/hourly/today", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        visitor: response.data,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/connected/hourly/today", {params: {siteId: siteId}})
                .then(response => {
                    this.setState({
                        connected: response.data,
                    })
                });
            HTTPPRESENCE.get("/api/presence/v1/dwell/hourly", {
                params: {
                    siteId: siteId,
                    date: moment().format('YYYY-MM-DD')
                }
            })
                .then(response => {
                    this.setState({
                        dwellTime: response.data,
                    })
                });
        }
    }

    render() {
        const {classes} = this.props;
        const {
            averageDwell,
            peakHour,
            conversionRate,
            averageDwellByLevels,
            visitorCount,
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
                direction="row"
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
                            className={'PreviewArea'}
                            months={3}
                            ranges={[this.state.dateRangePicker.selection]}
                            direction="horizontal"
                            maxDate={new Date()}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <MyCard
                        icon={<PersonIcon
                            fontSize="large"
                            className={classes.icon}
                        />}
                        data={visitorCount}
                        title="Total Visitors"
                        color="#6fbf73"
                    />
                </Grid>
                <Grid item xs={3}>
                    <MyCard
                        icon={<PollIcon
                            fontSize="large"
                            className={classes.icon}
                        />}
                        data={`${Math.round(averageDwell)} min(s)`}
                        title="Average Dwell Time"
                        color="#ed4b82"
                    />
                </Grid>
                <Grid item xs={3}>
                    <MyCard
                        icon={<TimelapseIcon
                            fontSize="large"
                            className={classes.icon}
                        />}
                        data={peakHour && `${peakHour}:00 - ${peakHour + 1}:00`}
                        title="Peak Hour"
                        color="#4dabf5"
                    />
                </Grid>
                <Grid item xs={3}>
                    <MyCard
                        icon={<MonetizationOnIcon
                            fontSize="large"
                            className={classes.icon}
                        />}
                        data={`${conversionRate}%`}
                        title="Conversion Rate"
                        color="#ffcd38"
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

export default withStyles(styles, {withTheme: true})(Analytics);
