// src/features/auth/authSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface UserData {
    _id:string
  name: string
  email: string
  phoneNumber: string
  password: string
}

interface AuthState {
  user: UserData | null
}

const getInitialUser = (): UserData | null => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

const initialState: AuthState = {
  user: getInitialUser(),
}


const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem('user')
    },
  },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
