import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { connectPost } from '../Api/ConnectApi';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import YouTube from 'react-youtube';
import { useForm, SubmitHandler } from "react-hook-form";
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: '#F5F5F5',
    },
    postCard: {
      width: "100%",
      textAlign: "left",
    },
  }),
);

type PostDetail = {
  id: number
  text: string
  user_name: string
  training_name: string
  url: string
  thumbnail_id: string
  created_at: Date
}

type Post = {
  id: number
  text: string
  user_name: string
  training_name: string
  url: string
  thumbnail_id: string
  created_at: Date
}

interface PostDetailProps {
  postData: Post|null
  handleFavoriteClick: Function
  handlePostOpen: Function
}

export const PostDetail: React.FC<PostDetailProps> = ({postData, handleFavoriteClick, handlePostOpen}) => {
  const classes = useStyles();

  const convertJst = (date:Date) => {
    const createdAt = new Date(date)
    createdAt.setTime(createdAt.getTime() + 9)
    return createdAt.toLocaleString('ja-JP').slice(0,-3);
  }

  return (
    <Card className={classes.postCard}>
      <div onClick={() => handlePostOpen(postData)}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          titleTypographyProps={{variant:'h6'}}
          title={postData != null ? postData.user_name : ""}
          subheader={postData != null ? convertJst(postData.created_at) : ""}
        />
        <CardContent>
          <Typography>
            {postData != null ? postData.training_name : ""} × 3セット
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="350"
          image={`https://i.ytimg.com/vi/${postData != null ? postData.url : ""}/${postData != null ? postData.thumbnail_id : ""}`}
        />
        <CardContent>
          <Typography>
            {postData != null ? postData.text : ""}
          </Typography>
        </CardContent>
      </div>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon id="favorite_icon" onClick={() => handleFavoriteClick()}/>
        </IconButton>
        <IconButton aria-label="share">
          <CommentIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}