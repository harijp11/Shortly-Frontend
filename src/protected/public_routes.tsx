import type { RootState } from '@/slice/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


interface Props {
  children: React.ReactElement
}

const UnprotectedRoute: React.FC<Props> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user)

  if (user) {
    return <Navigate to="/" replace />
  }

  return children
}

export default UnprotectedRoute
