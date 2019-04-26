import React, { Component } from 'react';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import ClientInfo from '../Map/ClientInfo/ClientInfo';

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function getSuggestions(value, clients) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : clients.filter(client => {
      const keep = count < 5 && client.macAddress.slice(0, inputLength).toLowerCase() === inputValue;
      if (keep) {
        count += 1;
      }
      return keep;
    });
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 50,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 2,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class Search extends Component {
  state = {
    isOpen: false,
    client: {},
  };

  handleClose = () => this.setState({ isOpen: false });

  render() {
    const { classes, clients } = this.props;
    const { isOpen, client } = this.state;

    return (
      <div className={classes.root}>
        <Downshift id="downshift-simple">
          {({
              getInputProps,
              getItemProps,
              getMenuProps,
              highlightedIndex,
              inputValue,
              isOpen,
              selectedItem,
            }) => (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                InputProps: getInputProps({
                  placeholder: 'MAC Address...',
                }),
              })}
              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {getSuggestions(inputValue, clients.e1.concat(clients.e2, clients.e3)).map((client, index) => (
                      <MenuItem
                        {...getItemProps({ item: client.macAddress })}
                        key={client.macAddress}
                        selected={highlightedIndex === index}
                        component="div"
                        style={{ fontWeight: (selectedItem || '').indexOf(client.macAddress) > -1 ? 500 : 400 }}
                        onClick={() => {
                          this.setState({ isOpen: true, client })
                        }}
                      >
                        {client.macAddress}
                      </MenuItem>
                    ))}
                  </Paper>
                ) : null}
              </div>
            </div>
          )}
        </Downshift>
        <div className={classes.divider} />
        <ClientInfo
          open={isOpen}
          onClose={this.handleClose}
          client={client}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Search);
