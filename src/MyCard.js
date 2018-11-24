import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';

const styles = {
    card: {
        maxWidth: 200,
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
};

function ImgMediaCard(props) {
    const {classes} = props;
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardContent>
                    <IconButton color="inherit">
                        <PersonIcon
                            fontSize="large"
                        />
                    </IconButton>
                    <Typography gutterBottom variant="h5" component="h2" align="right">
                        42
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        Total Visitors
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

ImgMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);