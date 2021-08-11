import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { connectPost, connectPatch } from '../Api/ConnectApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: "#F5F5F5"
    },

    root: {
      marginTop: 80,
      marginLeft: 100,
      height: 600,
    },

    paper: {
      position: 'absolute',
      width: 800,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "center",
    },

    afterRegisterButton: {

    },
  }),
);

interface IndexProps {
}

export const Index: React.FC<IndexProps> = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.main}>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={8}>
        <Card className={classes.root}>
          <h1>交流場</h1>
        </Card>
      </Grid>
    </Grid>
  );
}