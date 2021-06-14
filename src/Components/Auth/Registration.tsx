import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { RegistrationForm } from './RegistrationForm';
import { connectPost } from '../Api/ConnectApi';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: 60,
      backgroundColor: '#F5F5F5',
    },
  }),
);

interface RegistrationProps {

}

export const Registration: React.FC<RegistrationProps> = () => {
  const classes = useStyles();
  type RequestData = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  }

  const connectRegistrationApi = (requestData: RequestData) => {
    const responseData = connectPost("http://localhost:3000/api/v1/user/auth", requestData);
    console.log(responseData);
  }

  return (
    <div className={classes.main}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <RegistrationForm connectRegistrationApi={connectRegistrationApi}/>
        </Grid>
      </Grid>
    </div>
  );
}