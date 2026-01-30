import { createSlice } from '@reduxjs/toolkit'

const today = new Date().toISOString().split('T')[0]

const initialState = {
  startDate: today,
  endDate: today
}

const filtrosSlice = createSlice({
  name: 'filtros',
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload
    },
    resetFechas: (state) => {
      state.startDate = today
      state.endDate = today
    }
  }
})

export const { setStartDate, setEndDate, resetFechas } = filtrosSlice.actions
export default filtrosSlice.reducer

