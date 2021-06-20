import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { ToolBar } from './ToolBar';

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
  }),
);

interface TopProps {

}

export const Top: React.FC<TopProps> = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.main}>
      <Grid item xs={3}>
        <ToolBar/>
      </Grid>
      <Grid item xs={8}>
        <Card className={classes.root}>
        </Card>
      </Grid>
    </Grid>
  );
}