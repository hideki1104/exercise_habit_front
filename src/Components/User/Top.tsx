import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { UserForm } from './UserForm';
import { TrainingTypeForm } from './TrainingTypeForm';
import { TrainingDetail } from '../Training/TrainingDetail';
import { PostForm } from '../Post/PostForm';
import { connectPost, connectPatch } from '../Api/ConnectApi';
import { connectGetRecommendedTrainings, connectRecentTrainings, connectFavoriteTrainings } from '../Api/ConnectTrainingApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 800,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "center",
    },
    bodyContainer: {
      "textAlign": "left",
      "paddingLeft": 20,
      "fontWeight": "bold",
      "fontSize" : 20,
    },
    movieContainer: {
      margin: 20,
      '&:hover': {
        opacity: 0.6,
      }
    },
    movie: {
      height: 180,
      width: "100%",
      backgroundColor: "#F5F5F5",
    },
    difficulyType: {
      fontSize: 12,
      color: "#808080",
    },
    yt_thumnail: {
      height: 180,
      width: "100%",
    },
  }),
);

const difficulyTypeList = [
  '初心者向け',
  '中級者向け',
  '上級者向け',
];

function getModalStyle() {
  const top  = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

interface TopProps {
  isSignUp: boolean
}

export const Top: React.FC<TopProps> = ({isSignUp}) => {
  const classes = useStyles();
  const history = useHistory();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState<boolean>(false);
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState<boolean>(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [isProceed, setIsProceed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [recommendedTrainingList, setRecommendedTrainingList] = useState<TrainingData[]>([])
  const [recentTrainingList, setRecentTrainingList] = useState<TrainingData[]>([])
  const [favoriteTrainingList, setFavoriteTrainingList] = useState<TrainingData[]>([])
  const [targetTrainingData, setTargetTrainingData] = useState<TrainingData>()

  useEffect(() => {
    console.log(isSignUp);
    if (isSignUp) {
      setOpen(true)
    }

    getReccommendedTrainings();
    getRecentTrainings();
    getFavoriteTrainings();
  },[])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTrainingOpen   = (trainingData:TrainingData) => {
    setIsTrainingModalOpen(true);
    setTargetTrainingData(trainingData);
  }

  const handlePostOpen   = (trainingData:TrainingData) => {
    setIsPostModalOpen(true);
    setTargetTrainingData(trainingData);
  }

  const handleTrainingModalClose = () => setIsTrainingModalOpen(false);
  const handlePostModalClose = () => setIsPostModalOpen(false);


  type UserData = {
    height: number
    birthday: string
    sex: number
    training_type: number
  }

  type TrainingData = {
    id: number
    name: string
    url: string
    difficuly_type: number
    thumbnail_id: number
    description: string
    genre_id: number
  }

  const getReccommendedTrainings = async () => {
    const responseData = await connectGetRecommendedTrainings();

    setRecommendedTrainingList(responseData);
  }

  const getRecentTrainings = async () => {
    const responseData = await connectRecentTrainings();

    setRecentTrainingList(responseData);
  }

  const getFavoriteTrainings = async () => {
    const responseData = await connectFavoriteTrainings();

    setFavoriteTrainingList(responseData);
  }

  const handleUserInfoRegistration = async (userData:UserData, weight:number) => {
    const userInfoText: any = localStorage.getItem("userData");
    const userInfoData: any = JSON.parse(userInfoText);

    const responseUserData = await connectPatch(`http://localhost:3000/users/${userInfoData.data.id}`, userData);

    if (!responseUserData.isSuccess) {
      // エラー処理
      setErrorMessage("ユーザー情報の登録に失敗しました");
      return;
    }

    const reaponseWeightData = await connectPost('http://localhost:3000/weights', {'weight': weight, 'user_id': userInfoData.data.id});

    if (!reaponseWeightData.isSuccess) {
      // エラー処理
      setErrorMessage("ユーザー情報の登録に失敗しました");
      return;
    }

    setErrorMessage("");
    setIsProceed(true);
  }

  const handleTrainingTypeRegistration = async (trainingType:number) => {
    const userInfoText: any = localStorage.getItem("userData");
    const userInfoData: any = JSON.parse(userInfoText);

    const responseData = await connectPatch(`http://localhost:3000/users/${userInfoData.data.id}`, {'training_type': trainingType});

    if (!responseData.isSuccess) {
      // エラー処理
      setErrorMessage("ユーザー情報の登録に失敗しました");
      return;
    }

    setOpen(false);
    setIsProceed(false);
    history.push('/user/top');
  }

  const body = (
    !isProceed ?
    (<div style={modalStyle} className={classes.paper}>
      <UserForm handleUserInfoRegistration={handleUserInfoRegistration} errorMessage={errorMessage}/>
      <Button variant="outlined" color="primary" onClick={handleClose}>後で登録</Button>
    </div>)
    :
    (<div style={modalStyle} className={classes.paper}>
      <TrainingTypeForm handleTrainingTypeRegistration={handleTrainingTypeRegistration} errorMessage={errorMessage}/>
    </div>)
  )

  const modalBody = (
    <TrainingDetail targetTrainingData={targetTrainingData ? targetTrainingData : null} setIsOpen={handlePostOpen} setIsPostModalOpen={setIsPostModalOpen}/>
  )

  const postModalBody = (
    <PostForm targetTrainingData={targetTrainingData ? targetTrainingData : null}/>
  );

  return (
    <div>
      <p className={classes.bodyContainer}>あなたへのおすすめ</p>
      <Grid container alignItems="center" justify="flex-start">
        {recommendedTrainingList.map((training, index) => (
          <Grid item xs={4}>
            <div className={classes.movieContainer} onClick={() => handleTrainingOpen(recommendedTrainingList[index])}>
              <div className={classes.movie}>
                <img id="img" className={classes.yt_thumnail} alt="" src={`https://i.ytimg.com/vi/${training.url}/${training.thumbnail_id}`}></img>
              </div>
              <span>{training.name}</span><br/>
              <span className={classes.difficulyType}>難易度：{difficulyTypeList[training.difficuly_type]}</span><br/>
            </div>
          </Grid>
        ))}
      </Grid>
      <p className={classes.bodyContainer}>最近のトレーニング履歴</p>
      <Grid container alignItems="center" justify="flex-start">
        {recentTrainingList.map((training, index) => (
          <Grid item xs={4}>
            <div className={classes.movieContainer} onClick={() => handleTrainingOpen(recentTrainingList[index])}>
              <div className={classes.movie}>
                <img id="img" className={classes.yt_thumnail} alt="" src={`https://i.ytimg.com/vi/${training.url}/${training.thumbnail_id}`}></img>
              </div>
              <span>{training.name}</span><br/>
              <span className={classes.difficulyType}>難易度：{difficulyTypeList[training.difficuly_type]}</span><br/>
            </div>
          </Grid>
        ))}
      </Grid>
      <p className={classes.bodyContainer}>お気に入りトレーニング</p>
      <Grid container alignItems="center" justify="flex-start">
        {favoriteTrainingList.map((training, index) => (
          <Grid item xs={4}>
            <div className={classes.movieContainer} onClick={() => handleTrainingOpen(favoriteTrainingList[index])}>
              <div className={classes.movie}>
                <img id="img" className={classes.yt_thumnail} alt="" src={`https://i.ytimg.com/vi/${training.url}/${training.thumbnail_id}`}></img>
              </div>
              <span>{training.name}</span><br/>
              <span className={classes.difficulyType}>難易度：{difficulyTypeList[training.difficuly_type]}</span><br/>
            </div>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
      >
        {body}
      </Modal>
      <Modal
        open={isTrainingModalOpen}
        onClose={handleTrainingModalClose}
      >
        {modalBody}
      </Modal>
      <Modal
        open={isPostModalOpen}
        onClose={handlePostModalClose}
      >
        {postModalBody}
      </Modal>
    </div>
  );
}