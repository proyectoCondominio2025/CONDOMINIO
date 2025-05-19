import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // cambia según tu backend
    //   withCredentials: true, // si necesitas enviar cookies/sesiones
});
api.interceptors.request.use(
    (config) => {
        // No pongas token para rutas de login o refresh
        if (
            !config.url.endsWith('/token/') &&
            !config.url.endsWith('/token/refresh/')
        ) {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// === REFRESH AUTOMÁTICO DE TOKEN ===
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      // Si es 401 y no es una petición de login ni refresh...
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.endsWith('/token/') &&
        !originalRequest.url.endsWith('/token/refresh/')
      ) {
        // Marca el request para no hacer bucle infinito
        originalRequest._retry = true;
  
        if (isRefreshing) {
          // Espera a que el refresh en curso termine
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return api(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }
  
        isRefreshing = true;
        const refreshToken = localStorage.getItem('refreshToken');
        try {
          const res = await api.post('token/refresh/', { refresh: refreshToken });
          const newAccessToken = res.data.access;
          localStorage.setItem('accessToken', newAccessToken);
          api.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
          processQueue(null, newAccessToken);
          originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
          return api(originalRequest);
        } catch (err) {
          processQueue(err, null);
          // Borra los tokens y redirige a login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login'; // Redirige a login
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
      return Promise.reject(error);
    }
  );



export default api;