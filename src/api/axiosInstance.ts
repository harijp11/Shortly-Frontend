import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL || "https://shortly-server.harijp.tech/api/auth", 
  withCredentials: true, 
})

export default axiosInstance