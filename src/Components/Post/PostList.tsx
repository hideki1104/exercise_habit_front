import React, { useState, useEffect, useRef } from 'react';
import InfiniteScroll  from "react-infinite-scroller"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { connectGet } from '../Api/ConnectApi';
import { PostDetail } from './PostDetail';
import { PostModal } from './PostModal';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  }),
);

interface PostListProps {
}

export const PostList: React.FC<PostListProps> = () => {
  const classes = useStyles();
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
  const [postList, setPostList] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [targetPostData, setTargetPostData] = useState<Post>();
  const handleClose = () => setIsOpen(false);
  const handlePostOpen = (postData:Post) => {
    setIsOpen(true);
    setTargetPostData(postData);
  }

  useEffect(() => {
    const connectGetPostList = async () => {
      const responsePostList = await connectGet(`http://localhost:3000/posts`);
      if (!responsePostList.isSuccess ) {
        // エラー処理
        return;
      }
      setPostList(responsePostList.data);
    }
    connectGetPostList();
  }, [])

  const loadMore = (page:number) => {
  }

  const loader = <div className="loader" key={0}>Loading ...</div>;
  const modalBody = (
    <PostModal targetPostData={targetPostData ? targetPostData : null} handlePostOpen={handlePostOpen}/>
  )

  return (
    <>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={true}
        loader={loader}>
          {postList.map((post:Post) => (
            <PostDetail postData={post} handlePostOpen={handlePostOpen} isModalDisplay={false}/>
          ))}
      </InfiniteScroll>
      <Modal
        open={isOpen}
        onClose={handleClose}
      >
        {modalBody}
      </Modal>
    </>
  );
}