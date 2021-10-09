import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { connectCreateComment, connectGetComment } from '../Api/ConnectCommentApi';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { useForm, SubmitHandler } from "react-hook-form";
import { PostDetail } from './PostDetail';
import TextField from '@material-ui/core/TextField';

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
    commentForm: {
      width: 600,
    }
  }),
);

type Post = {
  id: number
  text: string
  user_id: number
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

  type CommentData = {
    text: string
    user_id: number
    post_id: number
  }

  useEffect(() => {
    const responseData = connectGetComment(targetPostData!.id);

    console.log(responseData);
  }, [])

  const handleOnSubmit: SubmitHandler<CommentData> = async (requestData: CommentData) => {
    const result:boolean = window.confirm("コメントを行いますか？");
    if (!result) {
      return;
    }
    requestData.user_id = targetPostData!.user_id;
    requestData.post_id = targetPostData!.id;

    const responseData = connectCreateComment(requestData, targetPostData!.id);

    if (!responseData) {
      return;
    }
  }

  return (
    <>
      <Card className={classes.paper} style={modalStyle}>
        <PostDetail postData={targetPostData ? targetPostData : null} handleFavoriteClick={handleFavoriteClick} handlePostOpen={handlePostOpen} isModalDisplay={true} />
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <TextField
            label="コメントを入力"
            type="text"
            variant="outlined"
            {...register("text", { required: true})}
            className={classes.commentForm}
          />
          <Button variant="contained" type="submit" color="primary">投稿</Button>
        </form>
      </Card>
    </>
  )
}