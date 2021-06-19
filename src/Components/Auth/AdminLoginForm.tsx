import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
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

    errorMessage: {
      height: 10,
      color: "red",
      fontSize: 12,
    },
  }),
);

interface AdminLoginFormProps {
  connectLoginApi: Function
  errorMessage: string
}

export const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ connectLoginApi, errorMessage }) => {
  type LoginData = {
    email: string
    password: string
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginData>()
  const classes = useStyles();

  const handleOnSubmit: SubmitHandler<LoginData> = (requestData: LoginData): void => {
    connectLoginApi(requestData);
  }

  return (
    <Card className={classes.root}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        管理者ログイン
      </Typography>
      <CardContent>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <span className={classes.errorMessage}>{errorMessage}</span><br/>
          <TextField className={classes.authForm} id="email" label="メールアドレス" variant="outlined" type="email" {...register("email", { required: true,
          pattern: {
          value: /\S+@\S+\.\S+/,
          message: "メールアドレスの形式が違います" }})}/><br/>
          <span className={classes.errorMessage}>
            {errors.email && errors.email.type === "required" && "メールアドレスを入力してください"}
            {errors.email && errors.email.type === "pattern" && "メールアドレスの形式が違います"}
          </span><br/>

          <TextField className={classes.authForm} id="password" label="パスワード" variant="outlined" type="password" {...register("password", { required: true, minLength: 6 })}/><br/>
          <span className={classes.errorMessage}>
            {errors.password && errors.password.type === "required" && "パスワードを入力してください"}
            {errors.password && errors.password.type === "minLength" && "パスワードは6文字以上で入力してください"}
          </span><br/>
          <Button className={classes.authButton} id="login_button" variant="contained" type="submit">ログイン</Button><br/>
        </form>
      </CardContent>
    </Card>
  );
}