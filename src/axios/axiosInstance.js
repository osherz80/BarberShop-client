const axios = require('axios').default;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000',
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('barberIncUserToken');

//     if (token) {
//       axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
//     } else {
//       delete axiosInstance.defaults.headers.common.Authorization;
//     }
//     return config;
//   },

//   (error) => Promise.reject(error),
// );

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('barberIncUserToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default axiosInstance;
