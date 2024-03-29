import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    upload_img: {
      display: "none",
    },
    avator: {
      width: 170,
      height: 170,
      marginTop: 30,
      marginBottom: 30,
      backgroundPosition: "center",
      backgroundSize: "cover",
      marginRight: "auto",
      marginLeft: "auto",
    },
    iconImage: {
      width: 170,
      height: 170,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  }),
);

type UserData = {
  id:number
  name:string
  image:string
  email:string
  height:number
  sex:number
  birthday:Date
  introduction:string
}

interface UserEditFormProps {
  connectUpdateUserInfo:Function
  userInfoData:UserData
  userWeightData:any
}

export const UserEditForm: React.FC<UserEditFormProps> = ({connectUpdateUserInfo, userInfoData, userWeightData}) => {
  const userDataText: any = localStorage.getItem("userData");
  const userData: any     = JSON.parse(userDataText);
  const [iconImage, setIconImage] = useState<string>("");

  type UserData = {
    name: string
    image: string
    email: string
    height: number
    weight?: number
    birthday: string
    sex: number
    introduction: string
  }

  const { register, handleSubmit, formState: { errors } } = useForm<UserData>({
  })
  const classes = useStyles();

  // const handleFile = (e:React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files === null || e.target.files.length === 0) {
  //     return;
  //   }

  //   const file = Object.values(e.target.files);

  //   if (!["image/gif", "image/jpeg", "image/png",].includes(file[0].type)) {
  //     return;
  //   }

  //   const fileReader = new FileReader();

  //   fileReader.onloadend = () => {
  //     const result: string = fileReader.result as string;
  //     setIconImage(result);
  //   }
  //   fileReader.readAsDataURL(file[0]);
  // }

  const handleOnSubmit: SubmitHandler<UserData> = (requestData: UserData): void => {

    let weight = null;
    if (requestData.weight) {
      weight = requestData.weight;
    }
    delete requestData.weight;

    let updateData:any = {};
    if (iconImage) {
      updateData.image = iconImage;
    }
    Object.entries(requestData).map(([key, value]) => {
      if (value) {
        updateData[key] = value;
      }
    })

    if (Object.values(updateData).length || weight) {
      connectUpdateUserInfo(updateData, weight);
    }
  }

  return (
    <>
      <CardContent>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          {/* {iconImage ?
            <Avatar aria-label="recipe" src="/broken-image.jpg" className={classes.avator}>
              <img id="icon_image" src={iconImage} className={classes.iconImage}/><br/>
            </Avatar>
            :
            <Avatar aria-label="recipe" src="/broken-image.jpg" className={classes.avator}>
            </Avatar>
          }
          <label htmlFor="upload-button">
            <input
              accept="image/*"
              id="upload-button"
              className={classes.upload_img}
              type="file"
              onChange={(e) => handleFile(e)}
            />
            <Button variant="contained" component="span">
              画像アップロード
            </Button>
          </label> */}
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
          defaultValue={userWeightData.weight}
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

          <TextField className={classes.userForm} id="introduction" label="自己紹介" variant="outlined"
          type="text"
          multiline
          rows={6}
          defaultValue={userInfoData.introduction}
           {...register("introduction", { maxLength: 75 })}/><br/>
          <span className={classes.errorMessage}>
            {errors.introduction && errors.introduction.type === "maxLength" && "75文字以内で入力してください"}
          </span><br/>

          <Button className={classes.registrationButton} id="login_button" variant="contained" type="submit">編集</Button><br/>
        </form>
      </CardContent>
    </>
  );
}