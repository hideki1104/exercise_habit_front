import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connectPost, connectPatch } from '../Api/ConnectApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "left",
    },
    textForm: {
      width: 500
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

interface PostFormProps {
}

export const PostForm: React.FC<PostFormProps> = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  return (
    <>
      <Card style={modalStyle} className={classes.paper}>
        <TextField
          id="description"
          className={classes.textForm}
          label="トレーニングはどうでしたか？"
          multiline
          rows={6}
          variant="outlined"
        />
        <Button variant="contained" type="submit" color="primary">投稿</Button>
      </Card>
    </>
  );
}