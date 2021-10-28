import { connectGet, connectPost } from './ConnectApi';
import * as constDefine from '../Const';

interface CommentDataType {
  text: string
  user_id: number
  post_id: number
}

// コメント作成APIの実行
export const connectCreateComment = async (requestData:CommentDataType, postId:number) => {
  const responseData = await connectPost(`${constDefine.BASE_URL()}/posts/${postId}/comments`, requestData);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData;
};

// 投稿IDに紐付くコメント一覧取得API
export const connectGetComment = async (postId:number) => {
  const responseData = await connectGet(`${constDefine.BASE_URL()}/posts/${postId}/comments`);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData.data;
};