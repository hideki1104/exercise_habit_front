import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
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
    },

    table: {
      width: '80%',
      paddingTop: 30,
      paddingBottom: 50,
      marginLeft: 75,
    },
    tableRow: {
      fontSize: 16,
      backgroundColor: "#F5F5F5",
    },
    tableTitle: {
      borderRadius: '5%',
      textAlign: 'center',
      paddingTop: 15,
      paddingBottom: 15,
      paddingRight: 30,
      color: "#A9A9A9",
    },
    tableValue: {
      borderRadius: '5%',
      textAlign: 'center',
      fontWeight: 'bold',
      paddingTop: 15,
      paddingBottom: 15,
    }
  }),
);

interface UserEditProps {

}

export const UserEdit: React.FC<UserEditProps> = () => {
  const classes = useStyles();
  const userDataText: any = localStorage.getItem("userData");
  const userData: any = JSON.parse(userDataText);

  return (
    <>
      <Grid container className={classes.main}>
        <Grid item xs={3}>
          <ToolBar/>
        </Grid>
        <Grid item xs={8}>
          <Card className={classes.root}>
            <h1>ユーザー編集画面</h1>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}