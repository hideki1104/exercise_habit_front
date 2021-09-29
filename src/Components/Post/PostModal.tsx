import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { connectPost } from '../Api/ConnectApi';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import YouTube from 'react-youtube';
import { useForm, SubmitHandler } from "react-hook-form";
import { PostDetail } from './PostDetail';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 700,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "left",
    },
  }),
);

type Post = {
  id: number
  text: string
  user_name: string
  training_name: string
  url: string
  thumbnail_id: string
  created_at: Date
}

function getModalStyle() {
  const top  = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

interface PostModalProps {
  targetPostData:Post|null
  handleFavoriteClick:Function
  handlePostOpen:Function
}

export const PostModal: React.FC<PostModalProps> = ({targetPostData, handleFavoriteClick, handlePostOpen}) => {
  const classes = useStyles();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [modalStyle] = useState(getModalStyle);

  return (
    <>
      <Card className={classes.paper} style={modalStyle}>
        <PostDetail postData={targetPostData ? targetPostData : null} handleFavoriteClick={handleFavoriteClick} handlePostOpen={handlePostOpen}/>
      </Card>
    </>
  )
}