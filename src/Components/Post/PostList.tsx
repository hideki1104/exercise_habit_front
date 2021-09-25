import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import InfiniteScroll  from "react-infinite-scroller"
import { makeStyles, Theme, createStyles, createTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { connectGet } from '../Api/ConnectApi';
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
    postCard: {
      width: "100%",
      textAlign: "left",
    },
  }),
);

interface PostListProps {
}

export const PostList: React.FC<PostListProps> = () => {
  const classes = useStyles();
  type Post = {
    id: number
    text: string
    user_name: string
    training_name: string
    url: string
    thumbnail_id: string
    created_at: Date
  }
  const [postList, setPostList] = useState<Post[]>([]);
  useEffect(() => {
    const connectGetPostList = async () => {
      const responsePostList = await connectGet(`http://localhost:3000/posts`);
      if (!responsePostList.isSuccess ) {
        // エラー処理
        return;
      }
      console.log(responsePostList.data);
      setPostList(responsePostList.data);
    }
    connectGetPostList();
  }, [])

  const convertJst = (date:Date) => {
    const createdAt = new Date(date)
    createdAt.setTime(createdAt.getTime() + 9)
    return createdAt.toLocaleString('ja-JP').slice(0,-3);
  }

  const loadMore = (page:number) => {
    console.log(page);
  }

  const loader =<div className="loader" key={0}>Loading ...</div>;

  return (
    <>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={true}
        loader={loader}>
          {postList.map((post:Post) => (
            <Card className={classes.postCard}>
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
                title={post.user_name}
                subheader={convertJst(post.created_at)}
              />
              <CardContent>
                <Typography>
                  {post.training_name} × 3セット
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                height="350"
                image={`https://i.ytimg.com/vi/${post.url}/${post.thumbnail_id}`}
              />
              <CardContent>
                <Typography>
                  {post.text}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <CommentIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
      </InfiniteScroll>
    </>
  );
}