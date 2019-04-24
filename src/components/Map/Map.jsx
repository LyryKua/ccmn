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
import Card from '@material-ui/core/Card/Card';
import { CISCO_CMX } from '../../api/http';


const TabContainer = props => (
  <Typography component="div" style={{ padding: 8 * 3 }}>
    {props.children}
  </Typography>
);

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
    chosenTab: 0,

    floorList: [],
    maps: {
      e1: null,
      e2: null,
      e3: null,
    },
    countMaps: {
      e1: null,
      e2: null,
      e3: null,
    },
  };

  handleChange = (event, chosenTab) => {
    this.setState({ chosenTab: chosenTab });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { siteId } = this.props;
    if (prevProps.siteId !== siteId) {
      console.log('props changed');
    }
  }

  fetchMap(map) {
    return CISCO_CMX
      .get(`/api/config/v1/maps/imagesource/${map}`, { responseType: 'blob' })
      .then(response => response.data)
      .catch(e => console.error(e));
  }

  fetchCountForFloor(floorRefId) {
    return CISCO_CMX
      .get('/api/location/v1/clients/count', { params: { floorRefId, Status: 'ASSOCIATED' } })
      .then(response => response.data)
      .catch(e => console.error(e));
  }

  fetchMaps() {
    const [
      { image: { imageName: mapE1 }, aesUidString: floorRefIdE1 },
      { image: { imageName: mapE2 }, aesUidString: floorRefIdE2 },
      { image: { imageName: mapE3 }, aesUidString: floorRefIdE3 },
    ] = this.props.maps;
    Promise.all([
      this.fetchMap(mapE1),
      this.fetchMap(mapE2),
      this.fetchMap(mapE3),
      this.fetchCountForFloor(floorRefIdE1),
      this.fetchCountForFloor(floorRefIdE2),
      this.fetchCountForFloor(floorRefIdE3),
    ]).then(data => {
      const [mapE1, mapE2, mapE3, countE1, countE2, countE3] = data;
      this.setState({
        maps: {
          e1: URL.createObjectURL(mapE1),
          e2: URL.createObjectURL(mapE2),
          e3: URL.createObjectURL(mapE3),
        },
        countMaps: {
          e1: countE1.count,
          e2: countE2.count,
          e3: countE3.count,
        },
      })
    });
  }

  componentDidMount() {
    this.fetchMaps();
  }

  render() {
    const { classes } = this.props;
    const { chosenTab, maps, countMaps } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <Tabs
            value={chosenTab}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label={
              <Badge className={classes.padding} color='primary' badgeContent={countMaps.e1}>E1</Badge>
            } />
            <Tab label={
              <Badge className={classes.padding} color='primary' badgeContent={countMaps.e2}>E2</Badge>
            } />
            <Tab label={
              <Badge className={classes.padding} color='primary' badgeContent={countMaps.e3}>E3</Badge>
            } />
          </Tabs>
          {chosenTab === 0 && <TabContainer><Cluster e={1} image={maps.e1} /></TabContainer>}
          {chosenTab === 1 && <TabContainer><Cluster e={2} image={maps.e2} /></TabContainer>}
          {chosenTab === 2 && <TabContainer><Cluster e={3} image={maps.e3} /></TabContainer>}
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
