import { connectGet, connectPost, connectDelete } from './ConnectApi';
import * as constDefine from '../Const';

// いいね作成APIの実行
export const connectCreateLike = async (post_id:number, user_id:number) => {
  const responseData = await connectPost(`${constDefine.BASE_URL()}/posts/${post_id}/likes`, {'post_id':post_id, 'user_id':user_id});

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData;
};

// いいね取得APIの実行(ユーザーが該当の投稿に対していいねしているか判定)
export const connectGetLike = async (post_id:number, user_id:number) => {
  const responseData = await connectGet(`${constDefine.BASE_URL()}/posts/${post_id}/likes/${user_id}`);
  console.log(responseData);

  if (responseData.data === null) {
      return false;
  }

  return true;
};

// いいね削除APIの実行
export const connectDeleteLike = async (post_id:number, user_id:number) => {
  const responseData = await connectDelete(`${constDefine.BASE_URL()}/posts/${post_id}/likes/${user_id}`);

  if (!responseData.isSuccess) {
      return false;
  }

  return responseData;
};