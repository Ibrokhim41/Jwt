import { configureStore } from "@reduxjs/toolkit";
import appreducer from './appSlice'
export const store = configureStore({
  reducer: {appreducer}
})
