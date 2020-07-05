import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { TextareaAutosize, IconButton } from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: TextareaAutosize,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  }
}));

export default function ReviewContainer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </Paper> */}
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar className={classes.purple}>{props.avatar}</Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="body2">{props.message}</Typography>
          </Grid>
          <IconButton onClick={props.clicked} id={props.id}>
            <DeleteIcon/>
          </IconButton>
        </Grid>
      </Paper>
    </div>
  );
}
