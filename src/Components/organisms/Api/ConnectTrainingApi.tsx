import { connectGet, connectPost } from './ConnectApi';
import * as constDefine from '../Const';

// おすすめのトレーニング取得APIの実行
export const connectGetRecommendedTrainings = async () => {
  const responseData = await connectGet(`${constDefine.BASE_URL()}/recommended_trainings`);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData.data;
};

// 最近のトレーニング取得APIの実行
export const connectRecentTrainings = async () => {
  const responseData = await connectGet(`${constDefine.BASE_URL()}/recent_trainings`);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData.data;
};

// お気に入りトレーニング取得APIの実行
export const connectFavoriteTrainings = async () => {
  const responseData = await connectGet(`${constDefine.BASE_URL()}/favorite_trainings`);
  console.log(responseData);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData.data;
};