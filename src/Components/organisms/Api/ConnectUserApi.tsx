import { connectGet, connectPost } from './ConnectApi';
import * as constDefine from '../Const';

// ユーザーIDに紐付くユーザー情報取得API
export const connectGetUser = async (userId:string) => {
  const responseUserData = await connectGet(`${constDefine.BASE_URL()}/users/${userId}`);

  if (!responseUserData.isSuccess) {
      return false;
  }

  return responseUserData.data;
};