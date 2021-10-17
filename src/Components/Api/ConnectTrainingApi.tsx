import { connectGet, connectPost } from './ConnectApi';

// おすすめのトレーニング取得APIの実行
export const connectGetRecommendedTrainings = async () => {
  const responseData = await connectGet("http://localhost:3000/recommended_trainings");

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData.data;
};

// 最近のトレーニング取得APIの実行
export const connectRecentTrainings = async () => {
  const responseData = await connectGet("http://localhost:3000/recent_trainings");
  console.log(responseData);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData.data;
};