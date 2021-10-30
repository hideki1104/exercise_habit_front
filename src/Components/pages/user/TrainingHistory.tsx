import React, { useEffect } from 'react';
import { UserContainer } from '../../templates/UserContainer';
import { HistoryList } from '../../organisms/History/HistoryList';
import { useHistory } from 'react-router-dom';

interface TrainingHistoryProps {
  checkIsLogin: Function
}

export const TrainingHistory: React.FC<TrainingHistoryProps> = ({checkIsLogin}) => {
  const history = useHistory();

  useEffect(() => {
    if (!checkIsLogin()) {
      history.push("/");
    }
  })

  return (
    <>
      <UserContainer title="トレーニング履歴" body={<HistoryList/>}/>
    </>
  )
}