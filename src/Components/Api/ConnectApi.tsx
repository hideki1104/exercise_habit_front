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
}

export const connectPost = (url:string, params: object):any => {
  axios
    .post(url,
      params,
    {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }}
    ).then((results) => {
        console.log(results);
        return results;
    })
    .catch((error) => {
        console.log('通信失敗:', error);
    });
  return 
};