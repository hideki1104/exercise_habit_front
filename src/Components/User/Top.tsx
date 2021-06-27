import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { ToolBar } from './ToolBar';
import { UserForm } from './UserForm';
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
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

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
    height: number|null
    birthday: string|null
    sex: number|null
    training_type: number|null
  }

  const handleUserInfoRegistration = async (userData:UserData, weight:number|null) => {
    const userInfoText: any = localStorage.getItem("userData");
    const userInfoData: any = JSON.parse(userInfoText);

    const responseUserData = await connectPatch(`http://localhost:3000/users/${userInfoData['id']}`, userData);

    if (!responseUserData.isSuccess) {
      // エラー処理
      return;
    }

    const reaponseWeightData = await connectPost('http://localhost:3000/weights', {'weight': weight, 'user_id':userInfoData['id']});

    if (!reaponseWeightData.isSuccess) {
      // エラー処理
      return;
    }
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <UserForm handleUserInfoRegistration={handleUserInfoRegistration}/>
      <Button className={classes.afterRegisterButton} variant="outlined" color="primary" onClick={handleClose}>後で登録</Button>
    </div>
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