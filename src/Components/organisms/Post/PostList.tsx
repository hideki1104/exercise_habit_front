import React, { useState, useEffect, useRef } from 'react';
import InfiniteScroll  from "react-infinite-scroller"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { connectGet } from '../Api/ConnectApi';
import { PostDetail } from './PostDetail';
import { PostModal } from './PostModal';
import Modal from '@material-ui/core/Modal';
import * as constDefine from '../Const';

interface PostListProps {
}

export const PostList: React.FC<PostListProps> = () => {
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
      const responsePostList = await connectGet(`${constDefine.BASE_URL()}/posts`);
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

  const loader = <div className="loader" key={0}></div>;
  const modalBody = (
    <PostModal targetPostData={targetPostData ? targetPostData : null} handlePostOpen={handlePostOpen}/>
  )

  return (
    <>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={true}
        loader={loader}>
          {postList.map((post:Post, index) => (
            <PostDetail postData={post} handlePostOpen={handlePostOpen} isModalDisplay={false} index={index}/>
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