import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import DevicesIcon from '@material-ui/icons/Devices';
import ClientInfo from './ClientInfo';

class DeviceDialog extends React.Component {
  state = {
    isOpen: false,
    clickedClient: {},
  };

  handleClickOpen = client => {
    console.log({ client });
    this.setState({
      isOpen: true,
      clickedClient: client,
    });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { clients } = this.props;
    const { isOpen, clickedClient } = this.state;

    return (
      <div>
        <List>
          {
            clients.map((client, index) => (
              <ListItem
                key={client.macAddress}
                button
                style={{ background: index % 2 && 'rgba(0, 0, 0, 0.08)' }}
                onClick={() => this.handleClickOpen(client)}
              >
                <ListItemIcon>
                  <DevicesIcon />
                </ListItemIcon>
                <ListItemText primary={`${index + 1}) ${client.macAddress}`} />
              </ListItem>
            ))
          }
        </List>
        <ClientInfo
          open={isOpen}
          onClose={this.handleClose}
          client={clickedClient}
        />
      </div>
    );
  }
}

export default DeviceDialog;