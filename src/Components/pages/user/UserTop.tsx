import React, { useEffect } from 'react';
import { UserContainer } from '../../templates/UserContainer';
import { Top } from '../../organisms/User/Top';
import { useHistory } from 'react-router-dom';

interface TopProps {
  isSignUp: boolean
  checkIsLogin: Function
}

export const UserTop: React.FC<TopProps> = ({isSignUp, checkIsLogin}) => {
  const history = useHistory();

  useEffect(() => {
    if (!checkIsLogin()) {
      history.push("/");
    }
  })

  return (
    <>
      <UserContainer title="" body={<Top isSignUp={isSignUp}/>}/>
    </>
  )
}