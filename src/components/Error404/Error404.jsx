import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  withStyles
} from '@material-ui/core';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    maxWidth: 545,
    flexGrow: 2,
  },
  media: {
    height: 340,
  },
};

function Error404(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="/not_found.jpg"
          title="404 Not Found"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            404 Not Found
          </Typography>
          <Typography component="p">
            Content not found
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default withStyles(styles)(Error404);
