import React from 'react';
import { TrainingIndex } from '../Training/TrainingIndex';
import { AdminContainer } from '../templates/AdminContainer';

interface TopProps {
}

export const Top: React.FC<TopProps> = () => {
  return (
    <>
      <AdminContainer title={"トレーニング一覧"} body={<TrainingIndex/>}/>
    </>
  );
}