import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import DevicesIcon from "@material-ui/icons/Devices";

const loremData = {
    macAddress: "fc:64:ba:0b:e5:a7",
    status: "UNKNOWN",
    networkStatus: "ACTIVE",
    ipAddresses: "N/A",
    coordinates: {
        x: 1157.9249,
        y: 40.25711
    },
    currentFloor: 2,
    firstSeen: "1h 1m 26s ago",
    lastSeen: "3m 28s ago",
    manufacturer: "Xiaomi",
    connectedAP: "Unknown",
    detectingControllers: "10.51.1.240",
    ssid: "Unknown",
    username: "Unknown",
    band: "UNKNOWN",
    bytesReceived: 0,
    bytesSent: 0,
};
const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    lst: {
        maxHeight: 500,
        overflow: 'auto'
    },
};

function toCapitalizedWords(name) {
    const words = name.match(/[A-Za-z][a-z]*/g) || [];

    return words.map(capitalize).join(" ");
}

function capitalize(word) {
    return (word === "ip" || word === "ssid") ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.substring(1);
}

class SimpleDialog extends React.Component {

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    render() {
        const {classes, onClose, ...other} = this.props;

        return (
            <Dialog
                onClose={this.handleClose}
                aria-labelledby="dialog-title"
                fullWidth={true}
                maxWidth="md"
                {...other}
                onClick={() => this.handleListItemClick()}
            >
                <DialogTitle id="dialog-title" disableTypography={true}>
                    <Typography variant="h2">
                        User Info
                    </Typography>
                </DialogTitle>
                <div>
                    <List>
                        {
                            Object.keys(loremData).map((key, index) => (
                                <ListItem
                                    key={index}
                                    style={{background: index % 2 || "rgba(0, 0, 0, 0.08)"}}
                                >
                                    <ListItemText>
                                        {toCapitalizedWords(key) + ": " + loremData[key]}
                                    </ListItemText>
                                </ListItem>
                            ))
                        }
                    </List>
                </div>
            </Dialog>
        );
    }
}

SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class DeviceDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = value => {
        this.setState({open: false});
    };

    render() {
        return (
            <div>
                <List component="nav" style={styles.lst}>
                    {
                        Array.from({length: 15}, (v, index) => (
                            <ListItem
                                key={index}
                                button
                                style={{background: index % 2 && "rgba(0, 0, 0, 0.08)"}}
                                onClick={this.handleClickOpen}
                            >
                                <ListItemIcon>
                                    <DevicesIcon/>
                                </ListItemIcon>
                                <ListItemText primary={index + ") 42:42:42:42:42:42"}/>
                            </ListItem>
                        ))
                    }
                </List>
                <SimpleDialogWrapped
                    open={this.state.open}
                    onClose={this.handleClose}
                />
            </div>
        );
    }
}

export default DeviceDialog;