import { connectGet, connectPost, connectDelete } from './ConnectApi';

// トレーニングお気に入り作成APIの実行
export const connectCreateTrainingLike = async (training_id:number) => {
  const responseData = await connectPost(`http://localhost:3000/trainings/${training_id}/training_likes`, {'training_id':training_id});

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData;
};

// トレーニングお気に入り取得APIの実行
export const connectGetTrainingLike = async (training_id:number) => {
  const responseData = await connectGet(`http://localhost:3000/trainings/${training_id}/training_likes/${training_id}`);
  console.log(responseData);

  if (responseData.data === null) {
      return false;
  }

  return true;
};

// トレーニングお気に入り削除APIの実行
export const connectDeleteTrainingLike = async (training_id:number) => {
  const responseData = await connectDelete(`http://localhost:3000/trainings/${training_id}/training_likes/${training_id}`);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData;
};