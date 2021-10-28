import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { AdminLoginForm } from './AdminLoginForm';
import { connectPost } from '../Api/ConnectApi';
import * as constDefine from '../Const';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: 60,
      backgroundColor: '#F5F5F5',
    },
  }),
);

interface AdminLoginProps {
  handleLogin: Function
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ handleLogin }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  type RequestData = {
    email: string
    password: string
  }
  const connectLoginApi = async (requestData: RequestData) => {
    const responseData = await connectPost(`${constDefine.BASE_URL()}/api/v1/admin/auth/sign_in`, requestData);

    if (!responseData.isSuccess) {
      // エラー処理
      setErrorMessage("ログイン認証に失敗しました")
      history.push('/admin/sign_in');
      return
    }

    handleLogin(responseData.data.name, responseData.headers)
    history.push('/admin/top');
  }
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <AdminLoginForm connectLoginApi={connectLoginApi} errorMessage={errorMessage}/>
        </Grid>
      </Grid>
    </div>
  );
}