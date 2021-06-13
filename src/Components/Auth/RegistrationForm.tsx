import React from 'react'
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm, SubmitHandler } from "react-hook-form";

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

interface RegistrationFormProps {

}

export const RegistrationForm: React.FC<RegistrationFormProps> = () => {
  const classes = useStyles();

  type RegistrationData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegistrationData>()

  const handleOnSubmit: SubmitHandler<RegistrationData> = (data): void => {
    console.log(data);
  }

  return (
    <Card className={classes.root}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        新規登録
      </Typography>
      <CardContent>
        <form className={classes.root} onSubmit={handleSubmit(handleOnSubmit)}>
          <TextField className={classes.authForm} id="name" label="お名前" variant="outlined" type="text" {...register("name", { required: true, maxLength: 50 })}/><br/>

          <TextField className={classes.authForm} id="email" label="メールアドレス" variant="outlined" type="email" {...register("email", { required: true })}/><br/>

          <TextField className={classes.authForm} id="password" label="パスワード" variant="outlined" type="password" {...register("password", { required: true })}/><br/>

          <TextField className={classes.authForm} id="password_comfirmation" label="パスワード(確認用)" variant="outlined" type="password" {...register("password_confirmation", { required: true })}/><br/>

          <Button className={classes.authButton} variant="contained" type="submit">登録</Button>

          <p className={classes.repletion}>すでにアカウントをお持ちの方は<Link to="/sign_in">こちら</Link></p>
        </form>
      </CardContent>
    </Card>
  );
}