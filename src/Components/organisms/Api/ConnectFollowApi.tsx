import { connectGet, connectPost, connectDelete } from './ConnectApi';
import * as constDefine from '../Const';

// フォローAPIの実行
export const connectCreateFollow = async (userId: number) => {
  const responseData = await connectPost(`${constDefine.BASE_URL()}/users/${userId}/relationships`, []);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData;
};

// フォロー削除APIの実行
export const connectDeleteFollow = async (userId: number) => {
  const responseData = await connectDelete(`${constDefine.BASE_URL()}/users/${userId}/relationships`);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData;
};

// フォローしているユーザーの取得APIの実行
export const connectGetFollowing = async (userId: number) => {
  const responseData = await connectGet(`${constDefine.BASE_URL()}/users/${userId}/followings`);

  return responseData;
};

// フォロワーの取得APIの実行
export const connectGetFollower = async (userId: number) => {
  const responseData = await connectGet(`${constDefine.BASE_URL}/users/${userId}/followers`);

  return responseData;
};