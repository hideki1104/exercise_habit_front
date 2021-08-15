import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: 60,
      backgroundColor: '#F5F5F5',
    },
    root: {
      height: 900,
      textAlign: 'center',
      marginTop: 30,
    },
  }),
);

interface TrainingFormProps {
}

export const TrainingForm: React.FC<TrainingFormProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <Card className={classes.root}>
            <h2>TrainingForm</h2>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}