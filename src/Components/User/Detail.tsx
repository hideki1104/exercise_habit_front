import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { ToolBar } from './ToolBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: "#F5F5F5"
    },
    root: {
      marginTop: 80,
      marginLeft: 100,
    },
    avatar: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      fontSize: 25,
      marginLeft: 200,
    },
    cardHeader: {
      display: "flex",
    },
    cardTitle: {
      marginLeft: 30,
    },
    cardName: {
      fontSize: 20,
      fontWeight: "bold",
    },
    cardEmail: {
      fontSize: 14,
      color: "#A9A9A9",
    },
    editButton: {
      textAlign: "center",
    }
  }),
);

interface DetailProps {

}

export const Detail: React.FC<DetailProps> = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.main}>
      <Grid item xs={3}>
        <ToolBar/>
      </Grid>
      <Grid item xs={8}>
        <Card className={classes.root}>
          <CardContent className={classes.cardHeader}>
            <Avatar aria-label="recipe" src="/broken-image.jpg" className={classes.avatar}>
            </Avatar>
            <div className={classes.cardTitle}>
              <p className={classes.cardName}>テスト太郎</p>
              <p className={classes.cardEmail}>test@example.com</p>
            </div>
          </CardContent>
          <CardContent className={classes.editButton}>
            <Button variant="outlined">プロフィールの編集</Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}