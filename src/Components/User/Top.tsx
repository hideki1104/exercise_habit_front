import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import { ToolBar } from './ToolBar';

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
      height: 500,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
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

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>ユーザー情報入力</h2>
      <button onClick={handleClose}>後で登録</button>
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