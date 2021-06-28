import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      paddingTop: 30,
    },

    userForm: {
      width: 500,
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
      width: 200,
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

interface TrainingTypeFormProps {
  handleTrainingTypeRegistration: Function
  errorMessage: string
}

export const TrainingTypeForm: React.FC<TrainingTypeFormProps> = ({handleTrainingTypeRegistration, errorMessage}) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<userData>()
  const classes = useStyles();

  type userData = {
    trainingType: number
  }

  const handleOnSubmit: SubmitHandler<userData> = (requestData: userData): void => {
    console.log(requestData.trainingType);

    handleTrainingTypeRegistration(requestData.trainingType);
  }

  return (
    <>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        トレーニングの目的を教えてください
      </Typography>
      <CardContent>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <span className={classes.errorMessage}>{errorMessage}</span><br/>

          <FormControl component="fieldset" className={classes.userForm}>
          <FormLabel className={classes.formTitile}></FormLabel>
            <RadioGroup defaultValue="0" aria-label="trainingType" {...register("trainingType")}>
              <Grid container>
                <Grid item>
                  <Radio
                    className={classes.radio}
                    disableRipple
                    color="default"
                    checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)}>健康維持</span>}
                    icon={<span className={classes.icon}>健康維持</span>}
                    value="2"
                  />
                </Grid>

                <Grid item>
                  <Radio
                    className={classes.radio}
                    disableRipple
                    color="default"
                    checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)}>痩せたい</span>}
                    icon={<span className={classes.icon}>痩せたい</span>}
                    value="0"
                  />
                </Grid>

                <Grid item>
                  <Radio
                    className={classes.radio}
                    disableRipple
                    color="default"
                    checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)}>筋肉をつけたい</span>}
                    icon={<span className={classes.icon}>筋肉をつけたい</span>}
                    value="1"
                  />
                </Grid>

                <Grid item>
                  <Radio
                    className={classes.radio}
                    disableRipple
                    color="default"
                    checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)}>気分転換</span>}
                    icon={<span className={classes.icon}>気分転換</span>}
                    value="3"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl><br/>

          <Button className={classes.registrationButton} id="login_button" variant="contained" type="submit">登録する</Button><br/>
        </form>
      </CardContent>
    </>
  );
}