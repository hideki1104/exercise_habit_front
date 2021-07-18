import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { ToolBar } from '../User/ToolBar';
import { connectPost } from '../Api/ConnectApi';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: "#F5F5F5"
    },

    root: {
      marginTop: 80,
      marginLeft: 100,
      marginBottom: 80,
      textAlign: 'center',
    },

    title: {
      fontSize: 30,
      fontWeight: 'bold',
      paddingTop: 30,
    },

    weightManagementButton: {
      textAlign: 'left',
    },

    errorMessage: {
      height: 10,
      color: "red",
      fontSize: 12,
    },
  }),
);

interface WeighRegistrationProps {
}

export const WeightRegistration: React.FC<WeighRegistrationProps> = () => {
  const classes = useStyles();

  type WeightData = {
    weight:number
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const handleOnSubmit: SubmitHandler<WeightData> = (requestData: WeightData): void => {
    console.log(requestData);
  }

  return (
    <Grid container className={classes.main}>
      <Grid item xs={3}>
        <ToolBar/>
      </Grid>
      <Grid item xs={8}>
        <Card className={classes.root}>
          <div className={classes.weightManagementButton}>
            <Link to='/weight_management'><Button>{'＜＜'}体重登録へ</Button></Link>
          </div>
          <Typography className={classes.title} color="textSecondary" gutterBottom>体重登録</Typography>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <TextField id="height" label="体重(kg)" variant="outlined" type="text" {...register("weight", { required: true,
            pattern: {
              value: /[0-9]/,
              message: "半角数字で入力してください" } })}/><br/>
            <span className={classes.errorMessage}>
              {errors.weight && errors.weight.type === "required" && "体重を入力してください"}
              {errors.weight && errors.weight.type === "pattern" && "半角数字で入力してください"}
            </span><br/>

            <Button variant="contained" type="submit">登録</Button><br/>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}