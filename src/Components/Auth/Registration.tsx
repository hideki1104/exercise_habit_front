import React from 'react'
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 700,
      textAlign: 'center',
      marginTop: 30,
    },

    main: {
      backgroundColor: '#F5F5F5'
    },

    title: {
      fontSize: 30,
      fontWeight: 'bold',
      paddingTop: 30,
    },

    authForm: {
      width: 300,
      marginTop: 30,
    },

    authButton: {
      fontSize: 16,
      width: 300,
      height: 50,
      marginTop: 30,
    },
    repletion: {
      color: "rgba(0, 0, 0, 0.54)",
    },
  }),
);

interface RegistrationProps {

}

export const Registration: React.FC<RegistrationProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <Card className={classes.root}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              新規登録
            </Typography>
            <CardContent>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField className={classes.authForm} id="name" label="お名前" variant="outlined" /><br/>
                <TextField className={classes.authForm} id="email" label="メールアドレス" variant="outlined" /><br/>
                <TextField className={classes.authForm} id="password" label="パスワード" variant="outlined" /><br/>
                <TextField className={classes.authForm} id="password_comfirmation" label="パスワード(確認用)" variant="outlined" /><br/>
                <Button className={classes.authButton} variant="contained">登録</Button>
                <p className={classes.repletion}>すでにアカウントをお持ちの方は<Link to="/sign_in">こちら</Link></p>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}