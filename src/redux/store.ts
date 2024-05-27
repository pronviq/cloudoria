import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import fileSlice from "./fileSlice";
import uploadSlice from "./uploadSlice";

const store = configureStore({
  reducer: {
    userReducer: userSlice,
    fileReducer: fileSlice,
    uploadReducer: uploadSlice,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
