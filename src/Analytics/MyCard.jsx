import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import PersonIcon from '@material-ui/icons/Person';

const styles = theme => ({
    icon: {
        fontSize: "100px",
    },
});

class MyCard extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
                <Grid container spacing={16}>
                    <Grid item>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                        >
                            <PersonIcon
                                fontSize="large"
                                className={classes.icon}
                            />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={16}>
                            <Grid item xs>
                                <Typography
                                    variant="subtitle1"
                                    align="right"
                                >
                                    4242
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h5" gutterBottom>Total Visitors</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

MyCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyCard);