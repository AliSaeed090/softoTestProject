import axios from "axios";
import { rootUrl } from "../../utilities/constants";

const instance = axios.create({
  baseURL: rootUrl,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
});

instance.interceptors.request.use(async (config: any) => {
  return config;
});

export default instance;
