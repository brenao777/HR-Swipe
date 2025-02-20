import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
});

let accessToken = '';

export function setAccessToken(token: string): void {
  accessToken = token;
}

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;
    if (error.response.status === 403 && !config.send) {
      const res = await axios.get('/api/tokens/refresh');
      setAccessToken(res.data.accessToken);
      config.send = true;
      config.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(config);
    }
    return Promise.reject(new Error());
  },
);

export default axiosInstance;
