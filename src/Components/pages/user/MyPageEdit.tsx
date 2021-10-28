import React from 'react';
import { UserContainer } from '../../templates/UserContainer';
import { UserEdit } from '../../organisms/User/UserEdit';

interface MyPageEditProps {

}

export const MyPageEdit: React.FC<MyPageEditProps> = () => {

  return (
    <>
      <UserContainer title="ユーザー編集" body={<UserEdit/>}/>
    </>
  )
}