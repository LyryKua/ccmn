// React JS
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// material-ui
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import ScoreIcon from '@material-ui/icons/Score';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import {fade} from '@material-ui/core/styles/colorManipulator';

// react-router-dom
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";

// My components
import Analytics from "./Analytics/Analytics";
import Map from "./Map/Map";
import Prediction from "./Prediction/Prediction";
import Correlation from "./Correlation/Correlation";
import {axiosTest, axiosTest2} from './api/tmp';
import {credentials} from "./api/credentials";
import {sitesAPI} from "./api/endpoints";
import {HTTPPRESENCE, HTTPLOCATE} from './api/http';
import {getSiteID} from "./api/getters";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
        // width: '100%',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    button: {
        margin: theme.spacing.unit,
    },
});

const drawerList = [
    {
        icon: <PeopleIcon/>,
        path: "/analytics",
        text: "Analytics",
        content: () => <Analytics/>,
    },
    {
        icon: <PersonPinCircleIcon/>,
        path: "/map",
        text: "Map",
        content: () => <Map/>,
    },
    {
        icon: <ScoreIcon/>,
        path: "/correlation",
        text: "Correlation",
        content: () => <Correlation/>,
    },
    {
        icon: <AvTimerIcon/>,
        path: "/prediction",
        text: "Prediction",
        content: () => <Prediction/>,
    },
];


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            siteId: 0,
        };
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    componentDidMount(){
        const self = this;
        HTTPPRESENCE.get("/api/config/v1/sites/")
            .then(response => {
                self.setState({
                    siteId: response.data[0].aesUId,
                });
            });
    }

    render() {
        const {classes, theme} = this.props;

        return (
            <Router>
                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: this.state.open,
                        })}
                        // TODO: refactor next lines
                        style={{paddingRight: this.state.open ? "0px" : "24px",}}
                    >
                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, {
                                    [classes.hide]: this.state.open,
                                })}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder="MAC address..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </div>
                            <div className={classes.grow}/>
                            <Button href="/" className={classes.button} color='inherit'>
                                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                    CCMN
                                </Typography>
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={classNames(classes.drawer, {
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        })}
                        classes={{
                            paper: classNames({
                                [classes.drawerOpen]: this.state.open,
                                [classes.drawerClose]: !this.state.open,
                            }),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={this.handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                            </IconButton>
                        </div>
                        <Divider/>
                        <List>
                            {
                                drawerList.map(item => (
                                    <Link to={item.path} style={{textDecoration: "none"}} key={item.text}>
                                        <ListItem button key={item.text}>
                                            <ListItemIcon>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={item.text}/>
                                        </ListItem>
                                    </Link>
                                ))
                            }
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        <Route exact path="/" render={() => (
                            <Redirect to="/analytics"/>
                        )}/>
                        <Route
                            path={"/analytics"}
                            render={() => <Analytics siteId={this.state.siteId}/>}
                        />
                        <Route
                            path={"/map"}
                            render={() => <Map siteId={this.state.siteId}/>}
                        />
                        <Route
                            path={"/correlation"}
                            render={() => <Correlation siteId={this.state.siteId}/>}
                        />
                        <Route
                            path={"/prediction"}
                            render={() => <Prediction siteId={this.state.siteId}/>}
                        />
                    </main>
                </div>
            </Router>
        );
    }
}


App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(App);
