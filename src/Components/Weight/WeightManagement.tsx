import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { ToolBar } from '../User/ToolBar';

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

interface WeightManagementProps {
}

export const WeightManagement: React.FC<WeightManagementProps> = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.main}>
      <Grid item xs={3}>
        <ToolBar/>
      </Grid>
      <Grid item xs={8}>
        <Card className={classes.root}>
          <h1>体重管理</h1>
        </Card>
      </Grid>
    </Grid>
  );
}