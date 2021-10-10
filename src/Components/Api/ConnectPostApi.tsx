import { connectGet, connectPost } from './ConnectApi';

interface PostDataType {
  training_id: number
  text: string
}

// 投稿作成APIの実行
export const connectCreatePost = async (requestData:PostDataType) => {
  const responseData = await connectPost("http://localhost:3000/posts", requestData);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData.data;
};

// 投稿IDに紐付くコメント一覧取得API
export const connectGetPost = async (postId:number) => {
  const responseData = await connectGet(`http://localhost:3000/posts/${postId}`);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData.data;
};