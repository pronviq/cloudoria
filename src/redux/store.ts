import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import fileSlice from "./fileSlice";

const store = configureStore({
  reducer: {
    userReducer: userSlice,
    fileReducer: fileSlice,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
