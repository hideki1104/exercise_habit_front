import React from 'react';
import { TrainingList } from '../Training/TrainingList';
import { AdminContainer } from '../templates/AdminContainer';

interface TopProps {
}

export const Top: React.FC<TopProps> = () => {
  return (
    <>
      <AdminContainer title={"トレーニング一覧"} body={<TrainingList isAdmin={true}/>}/>
    </>
  );
}