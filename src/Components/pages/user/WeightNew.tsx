import React from 'react';
import { UserContainer } from '../../templates/UserContainer';
import { WeightRegistration } from '../../organisms/Weight/WeightRegistration';

interface WeightIndexProps {

}

export const WeightNew: React.FC<WeightIndexProps> = () => {

  return (
    <>
      <UserContainer title="体重登録" body={<WeightRegistration/>}/>
    </>
  )
}