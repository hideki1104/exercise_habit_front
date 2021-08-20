import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { GenreForm } from '../Genre/GenreForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: 60,
      backgroundColor: '#F5F5F5',
    },
    root: {
      height: 900,
      textAlign: 'center',
      marginTop: 48,
      marginLeft: 50,
    },
  }),
);

interface TopProps {
}

export const Top: React.FC<TopProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={3}>
          <GenreForm/>
        </Grid>
        <Grid item xs={8}>
          <Card className={classes.root}>
            <h2>AdminTop</h2>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}