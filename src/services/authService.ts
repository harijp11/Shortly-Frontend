import axiosInstance from '../api/axiosInstance'

interface RegisterData {
  name: string
  email: string
  phoneNumber: string
  password: string
}

interface LoginData {
  email: string
  password: string
}

export const registerUser = async (data: RegisterData) => {
  const response = await axiosInstance.post('/register', data)
  return response.data
}

export const loginUser = async (data: LoginData) => {
  const response = await axiosInstance.post('/login', data)
  return response.data
}
