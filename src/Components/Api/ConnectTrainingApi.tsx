import { connectGet, connectPost } from './ConnectApi';

// おすすめのトレーニング取得APIの実行
export const connectGetRecommendedTrainings = async () => {
  const responseData = await connectGet("http://localhost:3000/recommended_trainings");
  console.log(responseData);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData.data;
};