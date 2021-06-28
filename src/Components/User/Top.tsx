import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { ToolBar } from './ToolBar';
import { UserForm } from './UserForm';
import { TrainingTypeForm } from './TrainingTypeForm';
import { connectPost, connectPatch } from '../Api/ConnectApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: "#F5F5F5"
    },

    root: {
      marginTop: 80,
      marginLeft: 100,
      height: 600,
    },

    paper: {
      position: 'absolute',
      width: 800,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "center",
    },

    afterRegisterButton: {

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

interface TopProps {
  isSignUp: boolean
}

export const Top: React.FC<TopProps> = ({isSignUp}) => {
  const classes = useStyles();
  const history = useHistory();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState<boolean>(false);
  const [isProceed, setIsProceed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (isSignUp) {
      setOpen(true)
    }
  },[])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  type UserData = {
    height: number
    birthday: string
    sex: number
    training_type: number
  }

  const handleUserInfoRegistration = async (userData:UserData, weight:number) => {
    const userInfoText: any = localStorage.getItem("userData");
    const userInfoData: any = JSON.parse(userInfoText);

    const responseUserData = await connectPatch(`http://localhost:3000/users/${userInfoData['id']}`, userData);

    if (!responseUserData.isSuccess) {
      // エラー処理
      setErrorMessage("ユーザー情報の登録に失敗しました");
      return;
    }

    const reaponseWeightData = await connectPost('http://localhost:3000/weights', {'weight': weight, 'user_id':userInfoData['id']});

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

    const responseData = await connectPatch(`http://localhost:3000/users/${userInfoData['id']}`, {'training_type': trainingType});

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
      <Button className={classes.afterRegisterButton} variant="outlined" color="primary" onClick={handleClose}>後で登録</Button>
    </div>)
    :
    (<div style={modalStyle} className={classes.paper}>
      <TrainingTypeForm handleTrainingTypeRegistration={handleTrainingTypeRegistration} errorMessage={errorMessage}/>
    </div>)
  )

  return (
    <Grid container className={classes.main}>
      <Grid item xs={3}>
        <ToolBar/>
      </Grid>
      <Grid item xs={8}>
        <Card className={classes.root}>
          <h1>Top画面</h1>
          <div>
            <button type="button" onClick={handleOpen}>
              Open Modal
            </button>
            <Modal
              open={open}
            >
              {body}
            </Modal>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}