import React, { useEffect } from 'react';
import { TrainingList } from '../../organisms/Training/TrainingList';
import { UserContainer } from '../../templates/UserContainer';
import { useHistory } from 'react-router-dom';

interface TrainingIndexProps {
  checkIsLogin: Function
}

export const TrainingIndex: React.FC<TrainingIndexProps> = ({checkIsLogin}) => {
  const history = useHistory();

  useEffect(() => {
    if (!checkIsLogin()) {
      history.push("/");
    }
  })

  return (
    <>
      <UserContainer title="トレーニング一覧" body={<TrainingList isAdmin={false}/>}/>
    </>
  )
}