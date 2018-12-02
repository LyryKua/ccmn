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

import * as loremData from './loremData';
import {getTotalVisitors} from "../api/getters";

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

    render() {
        const {classes} = this.props;

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
                        data={getTotalVisitors()}
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
                        data="42 mins"
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
                        data="3pm - 4pm"
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
                        data="42 %"
                        title="Conversion Rate"
                        color="#ffcd38"
                    />
                </Grid>
                <Grid item xs={7}>
                    <Typography variant="h6" gutterBottom>
                        Proximity
                    </Typography>
                    <BarGraph
                        datasets={loremData.barProximityDatasets}
                        labels={loremData.barProximityLabels}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h6" gutterBottom>
                        Proximity Distribution
                    </Typography>
                    <PieGraph
                        datasets={loremData.pieProximityDatasets}
                        labels={loremData.pieProximityLabels}
                    />
                </Grid>
                <Grid item xs={7}>
                    <Typography variant="h6" gutterBottom>
                        Dwell Time
                    </Typography>
                    <LineGraph
                        datasets={loremData.lineDwellTimeDatasets}
                        labels={loremData.lineDwellTimeLabels}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h6" gutterBottom>
                        Dwell Time Distribution
                    </Typography>
                    <PieGraph
                        datasets={loremData.pieDwellTimeDatasets}
                        labels={loremData.pieDwellTimeLabels}
                    />
                </Grid>
                <Grid item xs={7}>
                    <Typography variant="h6" gutterBottom>
                        Repeat Visitors
                    </Typography>
                    <LineGraph
                        datasets={loremData.lineRepeatVisitorsDatasets}
                        labels={loremData.lineRepeatVisitorsLabels}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h6" gutterBottom>
                        Repeat Visitors Distribution
                    </Typography>
                    <PieGraph
                        datasets={loremData.pieRepeatVisitorsDatasets}
                        labels={loremData.pieRepeatVisitorsLabels}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Analytics);
