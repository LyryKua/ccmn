import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeviceDialog from './DeviceDialog';

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
    [ theme.breakpoints.up('sm') ]: {
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
    const { classes } = this.props;

    return (
      <div className={classes.card}>
        <CardMedia
          className={classes.media}
          image={"/e" + this.props.e + ".jpeg"}
          title={"E" + this.props.e}
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classnames(classes.expand, {
              [ classes.expandOpen ]: this.state.isExpanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.isExpanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.isExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            <DeviceDialog />
          </CardContent>
        </Collapse>
      </div>
    )
  }
}

Cluster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cluster);
