import { connectGet, connectPost } from './ConnectApi';

// コメント作成APIの実行
export const connectCreateFollow = async (userId: number) => {
  const responseData = await connectPost(`http://localhost:3000/users/${userId}/relationships`, []);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData;
};