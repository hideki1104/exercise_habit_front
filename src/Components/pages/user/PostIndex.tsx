import React from 'react';
import { UserContainer } from '../../templates/UserContainer';
import { PostList } from '../../organisms/Post/PostList';

interface PostIndexProps {

}

export const PostIndex: React.FC<PostIndexProps> = () => {

  return (
    <>
      <UserContainer title="交流場" body={<PostList/>}/>
    </>
  )
}