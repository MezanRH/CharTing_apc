import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'

export default configureStore({
  reducer: {
    activeUser: userSlice
  },
})