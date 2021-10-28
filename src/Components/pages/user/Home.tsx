import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: 60,
    },
    mainImage: {
      width: "100%"
    }
  }),
);

interface HomeProps {

}

export const Home: React.FC<HomeProps> = () => {
  console.log(process.env.NODE_ENV);
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Grid container alignItems="center">
          <Grid item xs={9}>
            <img src={window.location.origin + `/images/portfolio_top.jpeg`} className={classes.mainImage}/>
          </Grid>
          <Grid item xs={3}>
            <p>トレーニングを始めよう</p>
          </Grid>
      </Grid>
    </div>
  );
}