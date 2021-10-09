import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
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
  user_id: number
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
  isModalDisplay:boolean
}

export const PostDetail: React.FC<PostDetailProps> = ({postData, handleFavoriteClick, handlePostOpen, isModalDisplay = false}) => {
  const classes = useStyles();
  const ref = useRef(null);
  const convertJst = (date:Date) => {
    const createdAt = new Date(date)
    createdAt.setTime(createdAt.getTime() + 9)
    return createdAt.toLocaleString('ja-JP').slice(0,-3);
  }
  const [isLike, setIsLike] = useState<boolean>(false)
  const [color, setColor] = useState("")

  useEffect(() => {
    setIsLike(isLike ? true : false)
  }, [])

  const handleClick = () => {
    setIsLike(!isLike ? true : false);
    setColor(color ? "secondary" : "");
    // handleFavoriteClick(postData!.id, postData!.user_id);
  }

  const iconContainer: JSX.Element = (
    <>
      {isModalDisplay ?
        <></>
        :
        <>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon id="favorite_icon" onClick={() => handleClick()}/>
            </IconButton>
            <IconButton aria-label="share">
              <CommentIcon />
            </IconButton>
          </CardActions>
        </>
      }
    </>
  )

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
      {iconContainer}
    </Card>
  );
}