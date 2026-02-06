import { configureStore } from '@reduxjs/toolkit'
import filtrosReducer from '../features/filtros/filtrosSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filtros: filtrosReducer,
  },
})