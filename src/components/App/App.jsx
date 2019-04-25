// TODO: add activeClassName for NavLink

import React, { Component } from 'react';
import classNames from 'classnames';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  withStyles,
} from '@material-ui/core';
import {
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';
import {
  Group as GroupIcon,
  Map as MapIcon,
  Timeline as TimelineIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
} from '@material-ui/icons';
import s from './styles';
import Analytics from '../Analytics';
import Map from '../Map';
import Prediction from '../Prediction';
import Error404 from '../Error404';
import { CISCO_CMX, CISCO_PRESENCE } from '../../api/http';

class App extends Component {
  state = {
    isOpen: false,
    siteId: null,
    maps: null,
  };

  handleDrawerOpen = () => this.setState({ isOpen: true });

  handleDrawerClose = () => this.setState({ isOpen: false });

  fetchSiteId() {
    return CISCO_PRESENCE
      .get('/api/config/v1/sites')
      .then(response => response.data)
      .catch(e => console.error(e));
  }

  fetchMaps() {
    return CISCO_CMX
      .get('/api/config/v1/maps')
      .then(response => response.data)
      .catch(e => console.error(e));
  }

  componentDidMount() {
    Promise.all([
      this.fetchSiteId(),
      this.fetchMaps(),
    ]).then(data => {
      const [siteId, maps] = data;
      this.setState({
        siteId: siteId[0]['aesUidString'],
        maps: maps['campuses']['0']['buildingList']['0']['floorList'],
      })
    })
  }

  render() {
    const { classes } = this.props;
    const { isOpen, siteId, maps } = this.state;

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: isOpen,
          })}
        >
          <Toolbar disableGutters={!isOpen}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuBtn, {
                [classes.hide]: isOpen,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              CCMN
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: isOpen,
            [classes.drawerClose]: !isOpen,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: isOpen,
              [classes.drawerClose]: !isOpen,
            }),
          }}
          open={isOpen}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <NavLink exact to={'/'}>
              <ListItem button>
                <ListItemIcon><GroupIcon /></ListItemIcon>
                <ListItemText primary={'Analytics'} />
              </ListItem>
            </NavLink>
            <NavLink exact to={'/map'}>
              <ListItem button>
                <ListItemIcon><MapIcon /></ListItemIcon>
                <ListItemText primary={'Map'} />
              </ListItem>
            </NavLink>
            <NavLink exact to={'/prediction'}>
              <ListItem button>
                <ListItemIcon><TimelineIcon /></ListItemIcon>
                <ListItemText primary={'Prediction'} />
              </ListItem>
            </NavLink>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {
            !(siteId && maps) ?
              <CircularProgress className={classes.progress} color="secondary" /> :
              <Switch>
                <Route
                  exact
                  path={'/'}
                  render={() => (<Analytics siteId={siteId} />)}
                />
                <Route
                  exact
                  path={'/map'}
                  render={() => (<Map maps={maps} />)}
                />
                <Route
                  exact
                  path={'/prediction'}
                  render={() => (<Prediction siteId={siteId} />)}
                />
                <Route component={Error404} />
              </Switch>
          }
        </main>
      </div>
    );
  }
}

export default withStyles(s, { withTheme: true })(App);
