import axios from 'axios';

interface connectGetType {
  isSuccess: boolean,
  data: any,
  headers: any,
  error: any,
}

export const connectGet = async (url:string):Promise<connectGetType> => {
  try {
    const headers: any    = localStorage.getItem("headers");
    const headerData: any = JSON.parse(headers);

    const response = await axios.get(url,
      {headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'access-token': headerData["access-token"],
        'client': headerData["client"],
        'uid': headerData["uid"],
      }}
    );
    console.log('通信成功', response);
    return { isSuccess: true, data: response.data, headers: response.headers, error: null };
  } catch(error) {
    console.log(error);
    return { isSuccess: false, data: {}, headers: {}, error: error };
  }
};

interface connectPostType {
  isSuccess: boolean,
  data: any,
  headers: any,
  error: any,
}

export const connectPost = async (url:string, params: object):Promise<connectPostType> => {
    try {
      const headers: any    = localStorage.getItem("headers");
      const headerData: any = JSON.parse(headers);
      const headerList = headerData == null ?
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
      :
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'access-token': headerData["access-token"],
        'client': headerData["client"],
        'uid': headerData["uid"],
      }

      const response = await axios.post(url, params,
        {headers:
          headerList
        }
      );
      console.log('通信成功', response);
      return { isSuccess: true, data: response.data, headers: response.headers, error: null };
    } catch(error) {
      console.log(error);
      return { isSuccess: false, data: {}, headers: {}, error: error };
    }
};

interface connectPatchType {
  isSuccess: boolean,
  data: any,
  headers: any,
  error: any,
}

export const connectPatch = async (url:string, params: object):Promise<connectPatchType> => {
  try {
    const headers: any    = localStorage.getItem("headers");
    const headerData: any = JSON.parse(headers);
    const response = await axios.patch(url, params,
      {headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'access-token': headerData["access-token"],
        'client': headerData["client"],
        'uid': headerData["uid"],
      }}
    );
    console.log('通信成功', response);
    return { isSuccess: true, data: response.data.data, headers: response.headers, error: null };
  } catch(error) {
    console.log(error);
    return { isSuccess: false, data: {}, headers: {}, error: error };
  }
};

interface connectDeleteType {
  isSuccess: boolean,
  error: any,
}

export const connectDelete = async (url:string):Promise<connectDeleteType> => {
  try {
    const headers: any    = localStorage.getItem("headers");
    const headerData: any = JSON.parse(headers);
    const response = await axios.delete(url,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'access-token': headerData["access-token"],
          'client': headerData["client"],
          'uid': headerData["uid"],
        }
      });
    console.log('通信成功', response);
    return { isSuccess: true, error: null };
  } catch(error) {
    console.log(error);
    return { isSuccess: false, error: error };
  }
};