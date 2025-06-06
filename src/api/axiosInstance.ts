import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.AUTH_URL, 
  withCredentials: true, 
})

export default axiosInstance