import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import Cluster from './Cluster';
import DeviceSnackbar from './DeviceSnackbar';
import { SnackbarProvider } from 'notistack';
import Card from "@material-ui/core/Card/Card";


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
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
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});

class Map extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { siteId } = this.props;
    if (prevProps.siteId !== siteId) {
      console.log("props changed");
    }
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label={
              <Badge className={classes.padding} color='primary' badgeContent={42}>
                E1
              </Badge>
            } />
            <Tab label={
              <Badge className={classes.padding} color='primary' badgeContent={42}>
                E2
              </Badge>
            } />
            <Tab label={
              <Badge className={classes.padding} color='primary' badgeContent={42}>
                E3
              </Badge>
            } />
          </Tabs>
          {value === 0 && <TabContainer><Cluster e={1} /></TabContainer>}
          {value === 1 && <TabContainer><Cluster e={2} /></TabContainer>}
          {value === 2 && <TabContainer><Cluster e={3} /></TabContainer>}
        </Card>
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
          <DeviceSnackbar />
        </SnackbarProvider>
      </div>
    );
  }
}

export default withStyles(styles)(Map);
