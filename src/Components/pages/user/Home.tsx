import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: 60,
    },
    mainImage: {
      width: "100%"
    },
    message: {
      fontWeight: "bold",
      fontSize: 28,
    },
    SignUp: {
      textDecoration: "none",
    },
    SignUpButton: {
      width: 200,
      height: 50,
      fontWeight: "bold",
      fontSize: 18,
    },
    repletion: {

    },
    messageContainer: {
      textAlign: "center",
    },
    titleContainer: {
      position: "absolute",
      top: 300,
      left: 700,
    },
    title: {
      color: "#ffffff",
      fontSize: 50,
      fontWeight: "bold",
    },
    subTitle: {
      color: "#ffffff",
      fontSize: 24,
      fontWeight: "bold",
    }
  }),
);

interface HomeProps {

}

export const Home: React.FC<HomeProps> = () => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Grid container alignItems="center">
          <Grid item xs={9}>
            <div className={classes.titleContainer}>
              <h1 className={classes.title}>Exercise Habit</h1>
              <p className={classes.subTitle}>~運動を習慣に~</p>
            </div>
            <img src={window.location.origin + `/images/portfolio_top.jpeg`} className={classes.mainImage}/>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.messageContainer}>
              <p className={classes.message}>トレーニングを始めよう</p>
              <Link to="/sign_up" className={classes.SignUp}><Button className={classes.SignUpButton} id="signUpButton" color="primary" variant="contained" type="button">サインアップ</Button></Link><br/>
              <p className={classes.repletion}>すでにアカウントをお持ちの方は<Link to="/sign_in">こちら</Link></p>
            </div>
          </Grid>
      </Grid>
    </div>
  );
}