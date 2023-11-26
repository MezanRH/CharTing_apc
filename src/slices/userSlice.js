import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'loginuser',
  initialState: {
    value: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  },
  reducers: {
    loggedUser: (state,action) => {
      // console.log("Logged user",action.payload)\
      state.value = action.payload
    },
  },
})

export const { loggedUser, } = userSlice.actions

export default userSlice.reducer