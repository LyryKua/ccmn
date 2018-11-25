import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import { DateRangePicker } from 'react-dates';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    date: {
        marginLeft: theme.spacing.unit * 2,
        display: 'flex',
    },
    dateText: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

const options = [
    'Today',
    'Yesterday',
    'Last 3 Days',
    'Last 7 Days',
    'Last 30 Days',
    'This Month',
    'Last Month',
    'Custom',
];

const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

class TimePicker extends Component {
    state = {
        anchorEl: null,
        selectedIndex: 7,
        endDate: new Date(),
        // startDate: new Date(2016, 10, 2),
        startDate: null,
        // endDate: null,
        focusedInput: null,
    };

    handleClickListItem = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuItemClick = (event, index) => {
        this.setState({
            selectedIndex: index,
            anchorEl: null,
        });
        let newStartDate = new Date();
        let newEndDate = new Date();
        switch (index) {
            case 0:
                newStartDate = null;
                break;
            case 1:
                newStartDate = null;
                newEndDate.setDate(newEndDate.getDate() - 1);
                break;
            case 2:
                newStartDate.setDate(newStartDate.getDate() - 3 + 1);
                break;
            case 3:
                newStartDate.setDate(newStartDate.getDate() - 7 + 1);
                break;
            case 4:
                newStartDate.setDate(newStartDate.getDate() - 30 + 1);
                break;
            case 5:
                newStartDate.setDate(1);
                break;
            case 6:
                newStartDate.setMonth(newEndDate.getMonth() - 1);
                newStartDate.setDate(1);
                newEndDate.setDate(0);
                break;
            default:
        }
        this.setState({
            startDate: newStartDate,
            endDate: newEndDate,
        })
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {classes} = this.props;
        const {anchorEl, startDate, endDate} = this.state;

        return (
            <div className={classes.root}>
                <List component="nav">
                    <ListItem
                        button
                        onClick={this.handleClickListItem}
                    >
                        <ListItemText
                            primary={options[this.state.selectedIndex]}
                            secondary="Date"
                        />
                    </ListItem>
                </List>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={index === this.state.selectedIndex}
                            onClick={event => this.handleMenuItemClick(event, index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
                {this.state.selectedIndex !== 7 && (
                    <div className={classes.date}>
                        {startDate &&
                        <Typography variant="h5" className={classes.dateText}>
                            {monthNames[startDate.getMonth()]} {startDate.getDate()}, {startDate.getFullYear()}
                        </Typography>
                        }
                        {startDate &&
                        <Typography variant="subtitle1"> to </Typography>
                        }
                        <Typography variant="h5" gutterBottom className={classes.dateText}>
                            {monthNames[endDate.getMonth()]} {endDate.getDate()}, {endDate.getFullYear()}
                        </Typography>
                    </div>
                )}
                {this.state.selectedIndex === 7 && (
                    <div className={classes.date}>
                        <DateRangePicker
                            startDateId="startDate"
                            endDateId="endDate"
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onDatesChange={({startDate, endDate}) => {
                                this.setState({startDate, endDate})
                            }}
                            focusedInput={this.state.focusedInput}
                            onFocusChange={(focusedInput) => {
                                this.setState({focusedInput})
                            }}
                        />
                    </div>
                )}
            </div>
        );
    }
}


TimePicker.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimePicker);
