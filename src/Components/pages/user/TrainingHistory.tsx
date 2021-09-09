import React from 'react';
import { UserContainer } from '../../templates/UserContainer';
import { HistoryList } from '../../History/HistoryList';

interface TrainingHistoryProps {

}

export const TrainingHistory: React.FC<TrainingHistoryProps> = () => {

  return (
    <>
      <UserContainer title="トレーニング履歴" body={<HistoryList/>}/>
    </>
  )
}