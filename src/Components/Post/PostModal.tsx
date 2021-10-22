import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { connectCreateComment, connectGetComment } from '../Api/ConnectCommentApi';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { useForm, SubmitHandler } from "react-hook-form";
import { PostDetail } from './PostDetail';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 700,
      height: 600,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "left",
    },
    commentForm: {
      flexGrow: 1,
      position: "fixed",
      bottom: 80,
      left: "26%",
      zIndex: 100,
    },
    commentInput: {
      width: 600,
      backgroundColor: "#ffffff",
    },
    commentText: {
      fontSize: 16,
      paddingLeft: 60,
    },
    commentHeader: {
      padding: 5,
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
    overflow: "scroll"
  };
}

interface PostModalProps {
  targetPostData:Post|null
  handlePostOpen:Function
}

export const PostModal: React.FC<PostModalProps> = ({targetPostData, handlePostOpen}) => {
  const classes = useStyles();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [modalStyle] = useState(getModalStyle);
  const [commentList, setCommentList] = useState<CommentData[]>([]);

  type CommentData = {
    name: string
    text: string
    user_id: number
    post_id: number
    created_at: Date
  }

  useEffect(() => {
    const connectGetCommentList = async () => {
      const responseData = await connectGetComment(targetPostData!.id);

      setCommentList(responseData);
    }

    connectGetCommentList();
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
      // エラー処理
    }
    commentList.push(requestData);

    if (!responseData) {
      return;
    }
  }

  const convertJst = (date:Date) => {
    const createdAt = new Date(date)
    createdAt.setTime(createdAt.getTime() + 9)
    return createdAt.toLocaleString('ja-JP').slice(0,-3);
  }

  const commentContainer:JSX.Element = (
    <>
    {commentList ?
      commentList.map((commentData) => (
        <>
          <Card>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe">
                  {commentData.name.slice(0, 1)}
                </Avatar>
              }
              className={classes.commentHeader}
              titleTypographyProps={{variant:'body1'}}
              title={commentData.name}
              subheader={convertJst(commentData.created_at)}
            />
            <p className={classes.commentText}>{commentData.text}</p>
          </Card>
        </>
      ))
      :
      <></>
    }
    </>
  )

  return (
    <>
      <Card className={classes.paper} style={modalStyle}>
        <PostDetail postData={targetPostData ? targetPostData : null} handlePostOpen={handlePostOpen} isModalDisplay={true} index={null}/>
        {commentContainer}
      </Card>
      <form onSubmit={handleSubmit(handleOnSubmit)} className={classes.commentForm}>
        <TextField
          InputProps={{
            className: classes.commentInput
          }}
          label="コメントを入力"
          type="text"
          variant="outlined"
          {...register("text", { required: true})}
        />
        <Button variant="contained" type="submit" color="primary">投稿</Button>
      </form>
    </>
  )
}