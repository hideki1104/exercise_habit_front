import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: 60,
    },
  }),
);

interface HomeProps {

}

export const Home: React.FC<HomeProps> = () => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <h2>Home</h2>
    </div>
  );
}