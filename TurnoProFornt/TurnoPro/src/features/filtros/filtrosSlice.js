import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  startDate: null,
  endDate: null
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
      state.startDate = null
      state.endDate = null
    }
  }
})

export const { setStartDate, setEndDate, resetFechas } = filtrosSlice.actions
export default filtrosSlice.reducer
