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
  Score as ScoreIcon,
  Timeline as TimelineIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
} from '@material-ui/icons';
import s from './styles';
import Analytics from '../Analytics';
import Map from '../Map';
import Correlation from '../Correlation';
import Prediction from '../Prediction';
import Error404 from '../Error404';
import { CISCO_PRESENCE } from "../../api/http";

const items = [
  {
    icon: <GroupIcon />,
    title: 'Analytics',
    component: Analytics,
    path: '/',
  },
  {
    icon: <MapIcon />,
    title: 'Map',
    component: Map,
    path: '/map',
  },
  {
    icon: <ScoreIcon />,
    title: 'Correlation',
    component: Correlation,
    path: '/correlation',
  },
  {
    icon: <TimelineIcon />,
    title: 'Prediction',
    component: Prediction,
    path: '/prediction',
  },
];

class App extends Component {
  state = {
    isOpen: false,
    siteId: null,
  };

  handleDrawerOpen = () => this.setState({ isOpen: true });

  handleDrawerClose = () => this.setState({ isOpen: false });

  componentDidMount() {
    CISCO_PRESENCE
      .get('/api/config/v1/sites')
      .then(response => this.setState({ siteId: response.data[ 0 ][ 'aesUidString' ] }))
      .catch(e => console.error(e));
  }

  render() {
    const { classes } = this.props;
    const { isOpen } = this.state;

    console.log(this.state.siteId);
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [ classes.appBarShift ]: isOpen,
          })}
        >
          <Toolbar disableGutters={!isOpen}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuBtn, {
                [ classes.hide ]: isOpen,
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
            [ classes.drawerOpen ]: isOpen,
            [ classes.drawerClose ]: !isOpen,
          })}
          classes={{
            paper: classNames({
              [ classes.drawerOpen ]: isOpen,
              [ classes.drawerClose ]: !isOpen,
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
            {
              items.map(item => (
                <NavLink
                  key={item.title}
                  exact
                  to={item.path}
                >
                  <ListItem button>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItem>
                </NavLink>
              ))
            }
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {
            !this.state.siteId
              ? <CircularProgress className={classes.progress} color="secondary" />
              : <Switch>
                {
                  items.map(item => (
                    <Route
                      key={item.title}
                      exact
                      path={item.path}
                      render={() => (<item.component siteId={this.state.siteId} />)}
                    />
                  ))
                }
                <Route component={Error404} />
              </Switch>
          }
        </main>
      </div>
    );
  }
}

export default withStyles(s, { withTheme: true })(App);
