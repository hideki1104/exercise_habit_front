import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { GenreForm } from '../organisms/Genre/GenreForm';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: '#F5F5F5',
    },
    root: {
      height: 900,
      textAlign: 'center',
      marginTop: 86,
      marginbottom: 80,
      marginLeft: 50,
      paddingBottom: 80,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      paddingTop: 30,
    },
  }),
);

interface AdminContainerProps {
  title: string
  body: JSX.Element
}

export const AdminContainer: React.FC<AdminContainerProps> = ({title, body}) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={3}>
          <GenreForm/>
        </Grid>
        <Grid item xs={8}>
          <Card className={classes.root}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {title}
            </Typography>
            {body}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}