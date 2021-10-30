import React, { useEffect } from 'react';
import { UserContainer } from '../../templates/UserContainer';
import { PostList } from '../../organisms/Post/PostList';
import { useHistory } from 'react-router-dom';

interface PostIndexProps {
  checkIsLogin: Function
}

export const PostIndex: React.FC<PostIndexProps> = ({checkIsLogin}) => {
  const history = useHistory();

  useEffect(() => {
    if (!checkIsLogin()) {
      history.push("/");
    }
  })

  return (
    <>
      <UserContainer title="交流場" body={<PostList/>}/>
    </>
  )
}