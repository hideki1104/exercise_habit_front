import React, { useEffect } from 'react';
import { UserContainer } from '../../templates/UserContainer';
import { WeightRegistration } from '../../organisms/Weight/WeightRegistration';
import { useHistory } from 'react-router-dom';

interface WeightIndexProps {
  checkIsLogin: Function
}

export const WeightNew: React.FC<WeightIndexProps> = ({checkIsLogin}) => {
  const history = useHistory();

  useEffect(() => {
    if (!checkIsLogin()) {
      history.push("/");
    }
  })

  return (
    <>
      <UserContainer title="体重登録" body={<WeightRegistration/>}/>
    </>
  )
}