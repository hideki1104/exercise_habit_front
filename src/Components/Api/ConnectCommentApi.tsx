import { connectGet, connectPost } from './ConnectApi';

interface CommentDataType {
  text: string
  user_id: number
  post_id: number
}

// コメント作成APIの実行
export const connectCreateComment = async (requestData:CommentDataType, postId:number) => {
  const responseData = await connectPost(`http://localhost:3000/posts/${postId}/comments`, requestData);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData;
};

// 投稿IDに紐付くコメント一覧取得API
export const connectGetComment = async (postId:number) => {
  const responseData = await connectGet(`http://localhost:3000/posts/${postId}/comments`);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData;
};