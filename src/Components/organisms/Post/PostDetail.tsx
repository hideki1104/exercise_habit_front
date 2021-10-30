import React, { useState, useEffect } from 'react';
import { connectCreateLike, connectGetLike, connectDeleteLike } from '../Api/ConnectLikeApi';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
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
    favorite_icon: {
      color: "red",
    },
    userPageLink: {
      textDecoration: "none",
      color: "#111111",
    }
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
  handlePostOpen: Function
  isModalDisplay:boolean
  index: number|null
}

export const PostDetail: React.FC<PostDetailProps> = ({postData, handlePostOpen, isModalDisplay = false, index}) => {
  const classes = useStyles();
  const convertJst = (date:Date) => {
    const createdAt = new Date(date)
    createdAt.setTime(createdAt.getTime() + 9)
    return createdAt.toLocaleString('ja-JP').slice(0,-3);
  }
  const [isLike, setIsLike] = useState<boolean>(false)

  useEffect(() => {
    const connectGetPostLike = async () => {
      const result:boolean = await connectGetLike(postData!.id, postData!.user_id);
      setIsLike(result)
    }

    connectGetPostLike();
  }, [])

  const handleClick = async () => {
    if (!isLike) {
      await connectCreateLike(postData!.id, postData!.user_id);
    } else {
      await connectDeleteLike(postData!.id, postData!.user_id);
    }

    setIsLike(isLike ? false : true);
  }

  const iconContainer: JSX.Element = (
    <>
      {isModalDisplay ?
        <></>
        :
        <>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon style={{color:isLike ? "red" : "gray"}} onClick={() => handleClick()}/>
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
      <Link to={`/user/${postData!.user_id}`} className={classes.userPageLink}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              {postData != null ? postData.user_name.slice(0, 1) : ""}
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
      </Link>
      <div onClick={() => handlePostOpen(postData)}>
        <CardContent>
          <Typography>
            {postData != null ? postData.training_name : ""}
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