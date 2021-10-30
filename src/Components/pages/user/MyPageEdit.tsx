import React, { useEffect } from 'react';
import { UserContainer } from '../../templates/UserContainer';
import { UserEdit } from '../../organisms/User/UserEdit';
import { useHistory } from 'react-router-dom';

interface MyPageEditProps {
  checkIsLogin: Function
}

export const MyPageEdit: React.FC<MyPageEditProps> = ({checkIsLogin}) => {
  const history = useHistory();

  useEffect(() => {
    if (!checkIsLogin()) {
      history.push("/");
    }
  })

  return (
    <>
      <UserContainer title="ユーザー編集" body={<UserEdit/>}/>
    </>
  )
}