import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { LoginForm } from './LoginForm';
import { connectPost } from '../Api/ConnectApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: 60,
      backgroundColor: '#F5F5F5',
    },
  }),
);

interface LoginProps {
  handleLogin: Function
}

export const Login: React.FC<LoginProps> = ({ handleLogin }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  type RequestData = {
    email: string
    password: string
  }
  const connectLoginApi = async (requestData: RequestData) => {
    const responseData = await connectPost("http://localhost:3000/api/v1/user/auth/sign_in", requestData);

    if (!responseData.isSuccess) {
      // エラー処理
      setErrorMessage("ログイン認証に失敗しました")
      history.push('/sign_in');
      return
    }

    handleLogin(responseData.data.name, responseData.headers)
    history.push(`/user/${responseData.data.id}`);
  }
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <LoginForm connectLoginApi={connectLoginApi} errorMessage={errorMessage}/>
        </Grid>
      </Grid>
    </div>
  );
}