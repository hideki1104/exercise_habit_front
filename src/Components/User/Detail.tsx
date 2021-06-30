import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { ToolBar } from './ToolBar';
import { connectGet } from '../Api/ConnectApi';

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

interface DetailProps {

}

export const Detail: React.FC<DetailProps> = () => {
  const classes = useStyles();
  const userDataText: any = localStorage.getItem("userData");
  const userData: any = JSON.parse(userDataText);

  useEffect(() => {
    connectGetUserInfo();
  })

  const connectGetUserInfo = async () => {
    const responseUserData = await connectGet(`http://localhost:3000/api/v1/user/${userData.id}`);
    if (!responseUserData.isSuccess ) {
      // エラー処理
    }

    const responseWeightData = await connectGet(`http://localhost:3000/api/v1/weight/${userData.id}`);
    if (!responseWeightData.isSuccess ) {
      // エラー処理
    }

  }

  return (
    <>
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
                <p className={classes.cardName}>{userData.name}</p>
                <p className={classes.cardEmail}>{userData.email}</p>
              </div>
            </CardContent>
            <CardContent className={classes.editButton}>
              <Link to={`/user/edit/${userData.id}`}><Button variant="outlined">プロフィールの編集</Button></Link>
            </CardContent>
            <table className={classes.table}>
              <tbody>
                <tr className={classes.tableRow}>
                  <th className={classes.tableTitle}>身長</th>
                  <td className={classes.tableValue}>170<span>cm</span></td>
                </tr>
                <tr className={classes.tableRow}>
                  <th className={classes.tableTitle}>体重</th>
                  <td className={classes.tableValue}>55<span>kg</span></td>
                </tr>
                <tr className={classes.tableRow}>
                  <th className={classes.tableTitle}>性別</th>
                  <td className={classes.tableValue}>女性</td>
                </tr>
                <tr className={classes.tableRow}>
                  <th className={classes.tableTitle}>生年月日</th>
                  <td className={classes.tableValue}>1993年11月04日</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}