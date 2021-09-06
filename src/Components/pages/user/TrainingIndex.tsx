import React from 'react';
import { TrainingList } from '../../Training/TrainingList';
import { UserContainer } from '../../templates/UserContainer';

interface TrainingIndexProps {

}

export const TrainingIndex: React.FC<TrainingIndexProps> = () => {

  return (
    <>
      <UserContainer title="トレーニング一覧" body={<TrainingList isAdmin={false}/>}/>
    </>
  )
}