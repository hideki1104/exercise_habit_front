import axios from 'axios';

interface connectGetType {
}

export const connectGet = (url:string):any => {
  axios
    .get(url)
    .then((results) => {
        console.log(results.data);
    })
    .catch((error) => {
        console.log('通信失敗');
        console.log(error.status);
    });
};

interface connectPostType {
  isSuccess: boolean,
  data: any,
  headers: any,
  error: string|null,
}

export const connectPost = async (url:string, params: object):Promise<connectPostType> => {
    try {
      const response = await axios.post(url, params,
        {headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }}
      );
      console.log('通信成功', response);
      return { isSuccess: true, data: response.data.data, headers: response.headers, error: null };
    } catch(error) {
      console.log(error);
      return { isSuccess: false, data: {}, headers: {}, error: error };
    }
};