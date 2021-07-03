import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import clsx from 'clsx';
import { connectGet } from '../Api/ConnectApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      paddingTop: 30,
    },

    userForm: {
      width: 300,
      marginTop: 30,
    },

    registrationButton: {
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
    radio: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },

    formTitile: {
      textAlign: "left",
    },

    icon: {
      borderRadius: '3%',
      fontSize: 16,
      width: 130,
      paddingTop: 10,
      paddingBottom: 10,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      'input:hover ~ &': {
        backgroundColor: '#A9A9A9',
        color: "#ffffff",
      },
    },
    checkedIcon: {
      backgroundColor: '#A9A9A9',
      color: "#ffffff",
      '&:before': {
        display: 'block',
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: '#A9A9A9',
        color: "#ffffff",
      },
    },
    birthdayField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
);

interface UserEditFormProps {
}

export const UserEditForm: React.FC<UserEditFormProps> = () => {
  const userDataText: any = localStorage.getItem("userData");
  const userData: any = JSON.parse(userDataText);
  const [userInfoData, setUserInfoData] = useState(userData);
  const [userWeight, setUserWeight] = useState();

  useEffect(() => {
    const connectGetUserInfo = async () => {
      const responseUserData = await connectGet(`http://localhost:3000/users/${userData.id}`);
      if (!responseUserData.isSuccess ) {
        // エラー処理
        return;
      }
      setUserInfoData(responseUserData.data);
    }

    const connectGetWeightInfo = async () => {
      const responseWeightData = await connectGet(`http://localhost:3000/weights/${userData.id}`);
      if (!responseWeightData.isSuccess ) {
        // エラー処理
        return;
      }
      setUserWeight(responseWeightData.data[0].weight);
    }

    connectGetUserInfo();
    connectGetWeightInfo();
  }, [])

  type UserData = {
    name: string
    email: string
    height: number
    weight?: number
    birthday: string
    sex: number
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserData>({
  })
  const classes = useStyles();

  const handleOnSubmit: SubmitHandler<UserData> = (requestData: UserData): void => {
    console.log(requestData);
  }

  return (
    <>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        ユーザー情報編集
      </Typography>
      <CardContent>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <span className={classes.errorMessage}></span><br/>

          <TextField className={classes.userForm} id="name" label="お名前" variant="outlined"
          type="text"
          defaultValue={userInfoData.name}
           {...register("name", { maxLength: 50 })}/><br/>
          <span className={classes.errorMessage}>
            {errors.name && errors.name.type === "maxLength" && "50文字以内で入力してください"}
          </span><br/>

          <TextField className={classes.userForm} id="email" label="メールアドレス" variant="outlined"
            type="email"
            defaultValue={userInfoData.email}
            {...register("email", {
            pattern: {
            value: /\S+@\S+\.\S+/,
            message: "メールアドレスの形式が違います" }})}/><br/>
          <span className={classes.errorMessage}>
            {errors.email && errors.email.type === "pattern" && "メールアドレスの形式が違います"}
          </span><br/>

          <TextField className={classes.userForm} id="height" label="身長(cm)" variant="outlined"
          defaultValue={userInfoData.height}
          type="text" {...register("height", {
          pattern: {
            value: /[0-9]/,
            message: "半角数字で入力してください" }})}/><br/>
          <span className={classes.errorMessage}>
            {errors.height && errors.height.type === "pattern" && "半角数字で入力してください"}
          </span><br/>

          <TextField className={classes.userForm} id="weight" label="体重(kg)" variant="outlined"
          defaultValue={userWeight}
          type="text" {...register("weight", {
          pattern: {
            value: /[0-9]/,
            message: "半角数字で入力してください" } })}/><br/>
          <span className={classes.errorMessage}>
            {errors.weight && errors.weight.type === "pattern" && "半角数字で入力してください"}
          </span><br/>

          <FormControl component="fieldset" className={classes.userForm}>
          <FormLabel className={classes.formTitile}>性別</FormLabel>
            <RadioGroup defaultValue={`${userInfoData.sex}`} aria-label="sex" {...register("sex")}>
              <Grid container>
                <Grid item>
                <Radio
                  className={classes.radio}
                  disableRipple
                  color="default"
                  checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)}>男性</span>}
                  icon={<span className={classes.icon}>男性</span>}
                  value="0"
                />
                </Grid>
                <Grid item>
                <Radio
                  className={classes.radio}
                  disableRipple
                  color="default"
                  checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)}>女性</span>}
                  icon={<span className={classes.icon}>女性</span>}
                  value="1"
                />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl><br/>

          <FormControl component="fieldset" className={classes.userForm}>
            <FormLabel className={classes.formTitile}>生年月日</FormLabel>
            <TextField
              defaultValue={userInfoData.birthday}
              id="date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("birthday")}
            />
          </FormControl><br/>
          <span className={classes.errorMessage}>
          </span><br/>

          <Button className={classes.registrationButton} id="login_button" variant="contained" type="submit">編集</Button><br/>
        </form>
      </CardContent>
    </>
  );
}