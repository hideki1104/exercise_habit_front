import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: 60,
    },
  }),
);

interface DetailProps {

}

export const Detail: React.FC<DetailProps> = () => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <h2>ログイン後ページ</h2>
    </div>
  );
}