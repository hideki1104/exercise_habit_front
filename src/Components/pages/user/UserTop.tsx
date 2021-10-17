import React from 'react';
import { UserContainer } from '../../templates/UserContainer';
import { Top } from '../../User/Top';

interface TopProps {
  isSignUp: boolean
}

export const UserTop: React.FC<TopProps> = ({isSignUp}) => {

  return (
    <>
      <UserContainer title="" body={<Top isSignUp={isSignUp}/>}/>
    </>
  )
}