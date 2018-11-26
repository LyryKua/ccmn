import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import MyCard from './MyCard';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/Person';
import PollIcon from '@material-ui/icons/Poll';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ColumnGraph from './ColumnGraph';
import CircleGraph from './CircleGraph';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grid: {
        align: 'center',
    },
    icon: {
        fontSize: "90px",
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
                <Grid item xs={12} className={classes.grid}>
                    <Paper style={{textAlign: 'center'}}>
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
                        data={4242}
                        title="Total Visitors"
                        color="#4caf50"
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
                        color="#e91e63"
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
                        color="#2196f3"
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
                        color="#ffc107"
                    />
                </Grid>
                <Grid item xs={8}>
                    <ColumnGraph/>
                </Grid>
                <Grid item xs={4}>
                    <CircleGraph/>
                </Grid>
                <Grid item xs={7}>
                    <ColumnGraph/>
                </Grid>
                <Grid item xs={5}>
                    <CircleGraph/>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Analytics);
