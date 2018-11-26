import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import MyCard from './MyCard';
import Paper from '@material-ui/core/Paper';


// import MyCard from '../MyCard';
// import GuttersGrid from './GuttersGrid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    grid: {
        align: 'center',
    },
});

class Analytics extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            dateRangePicker: {
                selection: {
                    startDate: new Date(),
                    endDate: addDays(new Date(), 7),
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
                spacing={24}
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
                    <MyCard/>
                </Grid>
                <Grid item xs={3}>
                    <MyCard
                        component="img"
                        alt="Contemplative Reptile"
                        image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                        title="Lizard"
                    >
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </MyCard>
                </Grid>
                <Grid item xs={3}>
                    <MyCard/>
                </Grid>
                <Grid item xs={3}>
                    <MyCard/>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Analytics);
