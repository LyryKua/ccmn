import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeviceDialog from './DeviceDialog';
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
  media: {
    height: 0,
    paddingTop: '50%',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class Cluster extends Component {
  state = {
    isExpanded: false,
    openDialog: false,
  };

  handleExpandClick = () => {
    this.setState(state => ({ isExpanded: !state.isExpanded }));
  };

  render() {
    const { classes, image, e, clients } = this.props;
    const { isExpanded } = this.state;

    return (
      <div className={classes.card}>
        {
          !image ?
            <CircularProgress className={classes.progress} color="secondary" /> :
            <CardMedia
              className={classes.media}
              image={image}
              title={'E' + e}
            />
        }
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classNames(classes.expand, { [classes.expandOpen]: isExpanded })}
            onClick={this.handleExpandClick}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            <DeviceDialog clients={clients} />
          </CardContent>
        </Collapse>
      </div>
    )
  }
}

export default withStyles(styles)(Cluster);
