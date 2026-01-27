import { configureStore } from '@reduxjs/toolkit'
import filtrosReducer from '../../src/features/filtros/filtrosSlice'

export const store = configureStore({
  reducer: {
    filtros: filtrosReducer
  }
})