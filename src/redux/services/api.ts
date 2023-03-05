import axios from "./axios";

interface payload {
  data?: Object;
  url: string;
}

export const get = async (url: string) => await axios.get(url);

export const post = (payload: payload) => {
  try {
    return axios.post(`${payload.url}`, payload.data);
  } catch (err: any) {
    if (err.response.status === 401) {
    } else {
      throw err;
    }
  }
};
