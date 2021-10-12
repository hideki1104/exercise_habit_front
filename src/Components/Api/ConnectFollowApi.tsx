import { connectGet, connectPost, connectDelete } from './ConnectApi';

// フォローAPIの実行
export const connectCreateFollow = async (userId: number) => {
  const responseData = await connectPost(`http://localhost:3000/users/${userId}/relationships`, []);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData;
};

export const connectDeleteFollow = async (userId: number) => {
  const responseData = await connectDelete(`http://localhost:3000/users/${userId}/relationships`);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData;
};