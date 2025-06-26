import axiosInstance from '../api/axiosInstance'
import { AUTH_API_ROUTES } from './routes/routes'

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
  const response = await axiosInstance.post(AUTH_API_ROUTES.REGISTER, data);
  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await axiosInstance.post(AUTH_API_ROUTES.LOGIN, data);
  return response.data;
}
