import { connectGet, connectPost, connectDelete } from './ConnectApi';

// フォローAPIの実行
export const connectCreateFollow = async (userId: number) => {
  const responseData = await connectPost(`http://localhost:3000/users/${userId}/relationships`, []);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData;
};

// フォロー削除APIの実行
export const connectDeleteFollow = async (userId: number) => {
  const responseData = await connectDelete(`http://localhost:3000/users/${userId}/relationships`);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData;
};

// フォローしているユーザーの取得APIの実行
export const connectGetFollowing = async (userId: number) => {
  const responseData = await connectGet(`http://localhost:3000/users/${userId}/followings`);

  return responseData;
};

// フォロワーの取得APIの実行
export const connectGetFollower = async (userId: number) => {
  const responseData = await connectGet(`http://localhost:3000/users/${userId}/followers`);

  return responseData;
};