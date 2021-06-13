import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { LoginForm } from './LoginForm';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: 60,
      backgroundColor: '#F5F5F5',
    },
  }),
);

interface LoginProps {

}

export const Login: React.FC<LoginProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <LoginForm/>
        </Grid>
      </Grid>
    </div>
  );
}