import axios from 'axios'
import { getToken, login } from './auth'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_HOST_DEV}/api/v1`,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  }
})

async function refreshToken(error) {
  return new Promise((resolve, reject) => {
    try {
      const refresh_token = localStorage.getItem("refresh_jwt");
      const token = getToken()
      const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` ,
        "Refresh-Token": refresh_token,
      };
      const parameters = {
        method: "POST",
        headers: header,
      };
      const body = {
        grant_type: "refresh_token",
        refresh_token,
      };
      axios
        .post(
          "https://app-coleta-api.herokuapp.com/api/v1/users/tokens",
          body,
          parameters
        )
        .then(async (res) => {
          login(res.headers['access-token'], res.headers['refresh-token'])
          // Fazer algo caso seja feito o refresh token
          return resolve(res);
        })
        .catch((err) => {
          // Fazer algo caso não seja feito o refresh token
          return reject(error);
        });
    } catch (err) {
      return reject(err);
    }
  });
};

api.interceptors.request.use(async (config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const access_token = getToken()
    const originalRequest = error.config;
    if (error.response.status === 401 && access_token && !originalRequest._retry) {
      const response = await refreshToken(error);
      originalRequest._retry = true;
      const access_token = response.headers['access-token']
      const refresh_token = response.headers['refresh-token']
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
      login(access_token, refresh_token)
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api
