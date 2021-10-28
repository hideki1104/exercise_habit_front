import React from 'react';
import { UserContainer } from '../../templates/UserContainer';
import { Detail } from '../../organisms/User/Detail';

interface MyPageProps {

}

export const MyPage: React.FC<MyPageProps> = () => {

  return (
    <>
      <UserContainer title="マイページ" body={<Detail/>}/>
    </>
  )
}