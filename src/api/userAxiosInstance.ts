import axios from 'axios';

const userAxiosInstance = axios.create({
  baseURL: import.meta.env.NEXT_PUBLIC_API_URL || "https://shortly-server.harijp.tech/api/user",
  withCredentials: true,
});

userAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Try to refresh access token
        await axios.get(`${import.meta.env.AUTH_URL}/refresh-token`, {
          withCredentials: true,
        });

        return userAxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);

        await axios.post('https://shortly-server.harijp.tech/api/auth/logout', {}, {
          withCredentials: true,
        });
        localStorage.removeItem('user'); 
  
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default userAxiosInstance;
