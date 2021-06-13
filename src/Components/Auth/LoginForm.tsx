import React from 'react'
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
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

interface LoginFormProps {

}

export const LoginForm: React.FC<LoginFormProps> = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        ログイン
      </Typography>
      <CardContent>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField className={classes.authForm} id="email" label="メールアドレス" variant="outlined" /><br/>
          <TextField className={classes.authForm} id="password" label="パスワード" variant="outlined" /><br/>
          <Button className={classes.authButton} id="login_button" variant="contained">ログイン</Button><br/>
          <Button className={classes.authButton} id="guest_login_button" variant="contained" color="primary">ゲストログイン</Button>
          <p className={classes.repletion}>新規登録の方は<Link to="/sign_up">こちら</Link></p>
        </form>
      </CardContent>
    </Card>
  );
}