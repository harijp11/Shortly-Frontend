import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.AUTH_URL || "https://shortly-server.harijp.tech/api/auth", 
  withCredentials: true, 
})

export default axiosInstance