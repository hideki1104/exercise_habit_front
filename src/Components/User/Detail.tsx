import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { FollowModal } from '../Relationship/FollowModal';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { connectGet } from '../Api/ConnectApi';
import { connectCreateFollow, connectDeleteFollow, connectGetFollowing, connectGetFollower } from '../Api/ConnectFollowApi';
import Modal from '@material-ui/core/Modal';

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
    },
    followNum: {
      padding: 10,
    },
    followerNum: {
      padding: 10,
    },
    paper: {
      position: 'absolute',
      width: 700,
      height: 600,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "left",
    },
    iconImage: {
      width: 170,
      height: 170,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  }),
);

function getModalStyle() {
  const top  = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

interface DetailProps {

}

export const Detail: React.FC<DetailProps> = () => {
  const classes = useStyles();
  const userDataText: any = localStorage.getItem("userData");
  const userData: any = JSON.parse(userDataText);
  const [userInfoData, setUserInfoData] = useState<UserData>();
  const [userWeightData, setUserWeightData] = useState(userData);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isClickFollowing, setIsClickFollowing] = useState<boolean>(false);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const [followingNum, setFollowingNum] = useState<number>();
  const [followerNum, setFollowerNum] = useState<number>();
  const [followerList, setFollowerList] = useState<UserData[]>([]);
  const [followingList, setFollowingList] = useState<UserData[]>([]);
  const history = useHistory();
  const pathData = history.location.pathname.split("/");
  const userId = pathData[pathData.length - 1];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleFollowModalOpen = (isFollowing:boolean) => {
    setIsClickFollowing(isFollowing);
    setIsOpen(true)
  };
  const handleClose = () => setIsOpen(false);

  type UserData = {
    id:number
    name:string
    image:string
    email:string
    height:number
    sex:number
    birthday:Date
    introduction:string
  }

  const connectGetUserInfo = async () => {
    const responseUserData = await connectGet(`http://localhost:3000/users/${userId}`);
    if (!responseUserData.isSuccess ) {
      // エラー処理
      return;
    }

    setUserInfoData(responseUserData.data);
  }

  const connectGetWeightInfo = async () => {
    const responseWeightData = await connectGet(`http://localhost:3000/weights/${userWeightData.id}`);
    if (!responseWeightData.isSuccess) {
      // エラー処理
      return;
    }

    setUserWeightData(responseWeightData.data[0]);
  }

  const judgeCurrentUser = () => {
    return userId == userData.data.id;
  }

  const isFollowingUser = async () => {
    const responseData = await connectGetFollowing(userData.data.id);
    setIsFollowing(responseData.data.some((userData:UserData) => userData.id == parseInt(userId)));
  }

  const getFollowing = async () => {
    const responseData = await connectGetFollowing(parseInt(userId));
    setFollowingList(responseData.data);
    setFollowingNum(responseData.data.length);
  }

  const getFollower = async () => {
    const responseData = await connectGetFollower(parseInt(userId));
    setFollowerList(responseData.data);
    setFollowerNum(responseData.data.length);
  }

  useEffect(() => {
    connectGetUserInfo();
    connectGetWeightInfo();
    setIsCurrentUser(judgeCurrentUser());
    isFollowingUser();
    getFollowing();
    getFollower();
  }, [userId])

  const handleFollowClick = async () => {
    await connectCreateFollow(userInfoData!.id);
    getFollower();
    setIsFollowing(true);
  }

  const handleUnfollowClick = async () => {
    await connectDeleteFollow(userInfoData!.id);
    getFollower();
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

  const modalBody:JSX.Element = (
    <FollowModal followingList={followingList} followerList={followerList} select={isClickFollowing ? 0 : 1} handleClose={handleClose}/>
  )

  return (
    <>
      <CardContent className={classes.cardHeader}>
        <Avatar aria-label="recipe" src="/broken-image.jpg" className={classes.avatar}>
         {userInfoData ? <img src={userInfoData.image} className={classes.iconImage}/> : ""}
        </Avatar>
        <div className={classes.cardTitle}>
          <p className={classes.cardName}>{userInfoData ? userInfoData.name :""}</p>
          <p className={classes.cardEmail}>{userInfoData ? userInfoData.email : ""}</p>
        </div>
      </CardContent>
      {isCurrentUser ?
        <></>
        :
        <p>{userInfoData ? userInfoData.introduction : ""}</p>
      }
      <span className={classes.followNum} onClick={() => handleFollowModalOpen(true)}>{followingNum}フォロー</span>
      <span className={classes.followerNum} onClick={() => handleFollowModalOpen(false)}>{followerNum}フォロワー</span> <br/>
      {!isCurrentUser ?
      <>
        {followButton}
      </>
      :
      <>
        <CardContent className={classes.editButton}>
          <Link to={`/user/edit/${userData.data.id}`} className={classes.linkButton}><Button variant="outlined">プロフィールの編集</Button></Link>
        </CardContent>
        <table className={classes.table}>
          <tbody>
            <tr className={classes.tableRow}>
              <th className={classes.tableTitle}>身長</th>
              <td className={classes.tableValue}>{userInfoData ? userInfoData.height : ""}<span>cm</span></td>
            </tr>
            <tr className={classes.tableRow}>
              <th className={classes.tableTitle}>体重</th>
              <td className={classes.tableValue}>{userWeightData ? userWeightData.weight : ""}<span>kg</span></td>
            </tr>
            <tr className={classes.tableRow}>
              <th className={classes.tableTitle}>性別</th>
              <td className={classes.tableValue}>{userInfoData ? userInfoData.sex : ""}</td>
            </tr>
            <tr className={classes.tableRow}>
              <th className={classes.tableTitle}>生年月日</th>
              <td className={classes.tableValue}>{userInfoData ? userInfoData.birthday : ""}</td>
            </tr>
          </tbody>
        </table>
      </>}
      <Modal
        open={isOpen}
        onClose={handleClose}
      >
        {modalBody}
      </Modal>
    </>
  )
}