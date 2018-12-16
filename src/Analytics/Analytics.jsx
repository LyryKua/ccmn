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

// TODO: replace *
import * as graphData from './graphData';
import {getSiteID, getTotalVisitors} from "../api/getters";
import {HTTPPRESENCE} from "../api/http";
import {pieDwellTimeDatasets_func} from "./graphData";

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
        this.setState({
            [which]: {
                ...this.state[which],
                ...payload,
            },
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.siteId !== this.props.siteId) {
            const {siteId} = this.props;
            HTTPPRESENCE.get("/api/presence/v1/kpisummary/today", {params: {siteId: siteId}})
                .then(response => {
                    console.log(response.data);
                    this.setState({
                        averageDwell: response.data.averageDwell,
                        totalVisitorCount: response.data.totalVisitorCount,
                        peakHour: response.data.peakSummary.peakHour,
                        conversionRate: response.data.conversionRate,
                        // averageDwellByLevels: response.data.averageDwellByLevels,
                    })
                });
        }
    }

    render() {
        const {classes} = this.props;
        const {
            averageDwell,
            totalVisitorCount,
            peakHour,
            conversionRate,
            // averageDwellByLevels,
        } = this.state;

        // const data1 = graphData.pieDwellTimeDatasets_func(averageDwellByLevels);
        console.log("now", graphData.pieDwellTimeDatasets);
        // console.log("todo", data1);
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
                        data={totalVisitorCount}
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
                        data={`${peakHour}:00 - ${peakHour + 1}:00`}
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
                        datasets={graphData.barProximityDatasets}
                        labels={graphData.barProximityLabels}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h6" gutterBottom>
                        Proximity Distribution
                    </Typography>
                    <PieGraph
                        datasets={graphData.pieProximityDatasets}
                        labels={graphData.pieProximityLabels}
                    />
                </Grid>
                <Grid item xs={7}>
                    <Typography variant="h6" gutterBottom>
                        Dwell Time
                    </Typography>
                    <LineGraph
                        datasets={graphData.lineDwellTimeDatasets}
                        labels={graphData.lineDwellTimeLabels}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h6" gutterBottom>
                        Dwell Time Distribution
                    </Typography>
                    <PieGraph
                        datasets={graphData.pieDwellTimeDatasets}
                        labels={graphData.pieDwellTimeLabels}
                    />
                </Grid>
                <Grid item xs={7}>
                    <Typography variant="h6" gutterBottom>
                        Repeat Visitors
                    </Typography>
                    <LineGraph
                        datasets={graphData.lineRepeatVisitorsDatasets}
                        labels={graphData.lineRepeatVisitorsLabels}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h6" gutterBottom>
                        Repeat Visitors Distribution
                    </Typography>
                    <PieGraph
                        datasets={graphData.pieRepeatVisitorsDatasets}
                        labels={graphData.pieRepeatVisitorsLabels}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Analytics);
