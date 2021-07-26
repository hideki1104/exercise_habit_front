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
      marginBottom: 40,
    },

    weightManagementButton: {
      textAlign: 'left',
    },

    errorMessage: {
      height: 10,
      color: "red",
      fontSize: 12,
    },
    calcWeight: {
      width: 200,
      height: 120,
      fontSize: 18,
      fontWeight: 'bold',
      backgroundColor: '#F5F5F5',
      marginTop: 30,
      marginLeft: 40,
      marginRight: 40,
      marginBottom: 30,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: '5%',
    },
    calcValue: {
      width: 140,
      height: 20,
      backgroundColor: '#ffffff',
      margin: 20,
      padding: 10,
      borderRadius: '5%',
    },
    unit: {
      fontSize: 14,
    },
    registrationButton: {
      width: 120,
      marginTop: 40,
      marginBottom: 40,
    }
  }),
);

interface WeighRegistrationProps {
}

export const WeightRegistration: React.FC<WeighRegistrationProps> = () => {
  const classes = useStyles();
  const userDataText: any = localStorage.getItem("userData");
  const userData: any = JSON.parse(userDataText);
  const [bmi, setBmi] = useState<number|null>(null);
  const [degreeObesity, setDegreeObesity] = useState<string>('');
  const [appropriateWeight, setAppropriateWeight] = useState<number|null>(null);

  type WeightData = {
    weight:number
  }

  const connectCreateOrUpdateWeight = async (requestData: WeightData) => {
      await connectPost(`http://localhost:3000/weights`, requestData);
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const handleOnSubmit: SubmitHandler<WeightData> = (requestData: WeightData): void => {
    const result:boolean = window.confirm("1日一回だけ体重を登録でき、2回目以降は前の体重が更新されます。登録・更新を行いますか？");
    if (!result) {
      return;
    }
    connectCreateOrUpdateWeight(requestData);
  }

  const onBlur = (inputValue:any) => {
    if (!inputValue) {
      return;
    }

    const bmi:number               = calcBmi(inputValue, userData.height);
    const degreeObesity:string     = decisionDegreeObesity(bmi);
    const appropriateWeight:number = calcAppropriateWeight(inputValue, userData.height);
    setBmi(bmi);
    setDegreeObesity(degreeObesity);
    setAppropriateWeight(appropriateWeight);
  }

  const calcBmi = (weight:number, height:number) => {
    return Math.floor((weight / (height * 0.01) ** 2) * Math.pow(10, 2)) / Math.pow(10, 2);
  }

  const decisionDegreeObesity = (bmi:number) => {
    if (bmi < 16) {
      return '痩せすぎ';
    } else if (bmi >= 16 && bmi <= 16.99) {
      return '痩せ';
    } else if (bmi >= 17 && bmi <= 18.49) {
      return '痩せぎみ';
    } else if (bmi >= 18.50 && bmi <= 24.99) {
      return '普通体重';
    } else if (bmi >= 25 && bmi <= 29.99) {
      return '前肥満';
    } else if (bmi >= 30 && bmi <= 34.99) {
      return '肥満(1度)';
    } else if (bmi >= 35 && bmi <= 39.99) {
      return '肥満(2度)';
    } else if (bmi >= 40) {
      return '肥満(3度)';
    } else {
      return '';
    }
  }

  const calcAppropriateWeight = (weight:number, height:number) => {
    return  Math.floor((weight- ((height * 0.01)**2) * 22) * Math.pow(10, 2)) / Math.pow(10, 2);
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
              message: "半角数字で入力してください" } })} onBlur={e => {onBlur(e.target.value)}}/><br/>
            <span className={classes.errorMessage}>
              {errors.weight && errors.weight.type === "required" && "体重を入力してください"}
              {errors.weight && errors.weight.type === "pattern" && "半角数字で入力してください"}
            </span><br/>
            <Grid container>
              <Grid item xs={4}>
                <div className={classes.calcWeight}>
                  <span>BMI</span>
                  <p className={classes.calcValue}>{bmi != null ? bmi : ''}</p>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.calcWeight}>
                  <span>肥満度</span>
                  <p className={classes.calcValue}>{degreeObesity}</p>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.calcWeight}>
                  <span>適正体重との差</span>
                  <p className={classes.calcValue}>{appropriateWeight != null && appropriateWeight >= 0 ? '+' : ''}{appropriateWeight}<span className={classes.unit}>kg</span></p>
                </div>
              </Grid>
            </Grid>
            <Button className={classes.registrationButton} variant="contained" type="submit">登録する</Button><br/>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}