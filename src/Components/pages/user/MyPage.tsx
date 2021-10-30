import React, { useEffect } from 'react';
import { UserContainer } from '../../templates/UserContainer';
import { Detail } from '../../organisms/User/Detail';
import { useHistory } from 'react-router-dom';

interface MyPageProps {
  checkIsLogin: Function
}

export const MyPage: React.FC<MyPageProps> = ({checkIsLogin}) => {
  const history = useHistory();

  useEffect(() => {
    if (!checkIsLogin()) {
      history.push("/");
    }
  })

  return (
    <>
      <UserContainer title="マイページ" body={<Detail/>}/>
    </>
  )
}