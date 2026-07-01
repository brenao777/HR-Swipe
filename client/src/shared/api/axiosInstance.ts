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

// On a 403 (expired access token) try to refresh it once, then replay the request.
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (response?.status === 403 && config && !config.sent) {
      try {
        const res = await axios.get('/api/tokens/refresh');
        setAccessToken(res.data.accessToken);
        config.sent = true;
        config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return await axiosInstance(config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
