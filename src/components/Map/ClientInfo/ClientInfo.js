import React from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import Typography from '@material-ui/core/Typography/Typography';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';

class ClientInfo extends React.Component {

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { client, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="dialog-title"
        fullWidth={true}
        maxWidth="md"
        {...other}
      >
        <DialogTitle id="dialog-title" disableTypography={true}>
          <Typography variant="h2">
            User Info
          </Typography>
        </DialogTitle>
        <div>
          <List>
            <ListItem style={{ background: 'rgba(0, 0, 0, 0.08)' }}>
              <ListItemText>
                User Name: {client.userName || 'UNKNOWN'}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Mac Address: {client.macAddress || 'UNKNOWN'}
              </ListItemText>
            </ListItem>
            <ListItem style={{ background: 'rgba(0, 0, 0, 0.08)' }}>
              <ListItemText>
                IP Address: {client.ipAddress && client.ipAddress[0] || 'UNKNOWN'}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Map Coordinate: {client.mapCoordinate && `x = ${client.mapCoordinate.x}, y = ${client.mapCoordinate.y}`}
              </ListItemText>
            </ListItem>
            <ListItem style={{ background: 'rgba(0, 0, 0, 0.08)' }}>
              <ListItemText>
                SSID: {client.ssId || 'UNKNOWN'}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Network Status: {client.networkStatus || 'UNKNOWN'}
              </ListItemText>
            </ListItem>
            <ListItem style={{ background: 'rgba(0, 0, 0, 0.08)' }}>
              <ListItemText>
                Bytes Sent: {client.bytesSent || 'UNKNOWN'}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Bytes Received: {client.bytesReceived || 'UNKNOWN'}
              </ListItemText>
            </ListItem>
            <ListItem style={{ background: 'rgba(0, 0, 0, 0.08)' }}>
              <ListItemText>
                Manufacturer: {client.manufacturer || 'UNKNOWN'}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Map Hierarchy: {client.mapHierarchyString || 'UNKNOWN'}
              </ListItemText>
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}

export default ClientInfo;
