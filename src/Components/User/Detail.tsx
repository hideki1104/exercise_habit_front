import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { connectGet } from '../Api/ConnectApi';
import { connectCreateFollow, connectDeleteFollow } from '../Api/ConnectFollowApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    },
    linkButton: {
      textDecoration: "none",
    }
  }),
);

interface DetailProps {

}

export const Detail: React.FC<DetailProps> = () => {
  const classes = useStyles();
  const userDataText: any = localStorage.getItem("userData");
  const userData: any = JSON.parse(userDataText);
  const [userInfoData, setUserInfoData] = useState(userData.data);
  const [userWeightData, setUserWeightData] = useState(userData);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    const connectGetUserInfo = async () => {
      const responseUserData = await connectGet(`http://localhost:3000/users/${userData.data.id}`);
      if (!responseUserData.isSuccess ) {
        // エラー処理
        return;
      }

      setUserInfoData(responseUserData.data);
    }

    const connectGetWeightInfo = async () => {
      const responseWeightData = await connectGet(`http://localhost:3000/weights/${userWeightData.id}`);
      if (!responseWeightData.isSuccess ) {
        // エラー処理
        return;
      }

      setUserWeightData(responseWeightData.data[0]);
    }

    connectGetUserInfo();
    connectGetWeightInfo();
  }, [])

  const handleFollowClick = () => {
    connectCreateFollow(userInfoData.id);
    setIsFollowing(true);
  }

  const handleUnfollowClick = () => {
    connectDeleteFollow(userInfoData.id);
    setIsFollowing(false);
  }

  const followButton:JSX.Element = (
    <>
    {!isFollowing ?
      <Button variant="outlined" onClick={handleFollowClick} color="primary">フォローする</Button>
      :
      <Button variant="outlined" onClick={handleUnfollowClick} color="secondary">フォロー解除</Button>
    }
    </>
  )

  return (
    <>
      <CardContent className={classes.cardHeader}>
        <Avatar aria-label="recipe" src="/broken-image.jpg" className={classes.avatar}>
        </Avatar>
        <div className={classes.cardTitle}>
          <p className={classes.cardName}>{userInfoData.name}</p>
          <p className={classes.cardEmail}>{userInfoData.email}</p>
        </div>
      </CardContent>
      {followButton}
      <CardContent className={classes.editButton}>
        <Link to={`/user/edit/${userData.id}`} className={classes.linkButton}><Button variant="outlined">プロフィールの編集</Button></Link>
      </CardContent>
      <table className={classes.table}>
        <tbody>
          <tr className={classes.tableRow}>
            <th className={classes.tableTitle}>身長</th>
            <td className={classes.tableValue}>{userInfoData.height}<span>cm</span></td>
          </tr>
          <tr className={classes.tableRow}>
            <th className={classes.tableTitle}>体重</th>
            <td className={classes.tableValue}>{userWeightData.weight}<span>kg</span></td>
          </tr>
          <tr className={classes.tableRow}>
            <th className={classes.tableTitle}>性別</th>
            <td className={classes.tableValue}>{userInfoData.sex ? "女性" : "男性"}</td>
          </tr>
          <tr className={classes.tableRow}>
            <th className={classes.tableTitle}>生年月日</th>
            <td className={classes.tableValue}>{userInfoData.birthday}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}