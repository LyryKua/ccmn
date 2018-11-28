import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Cluster from './Cluster';
import DeviceSnackbar from './DeviceSnackbar';
import {SnackbarProvider} from 'notistack';

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class Map extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <div className={classes.root}>
                <Paper className={classes.root}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="E1"/>
                        <Tab label="E2"/>
                        <Tab label="E3"/>
                    </Tabs>
                    {value === 0 && <TabContainer><Cluster e={1}/></TabContainer>}
                    {value === 1 && <TabContainer><Cluster e={2}/></TabContainer>}
                    {value === 2 && <TabContainer><Cluster e={3}/></TabContainer>}
                </Paper>
                {/*TODO: Delete next rows*/}
                <SnackbarProvider
                    maxSnack={5}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    style={{
                        opacity: 0.8,
                    }}
                >
                    <DeviceSnackbar/>
                </SnackbarProvider>
            </div>
        );
    }
}

export default withStyles(styles)(Map);
