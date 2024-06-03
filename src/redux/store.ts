import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import fileSlice from "./fileSlice";
import uploadSlice from "./uploadSlice";
import contextSlice from "./contextSlice";
import popupSlice from "./popupSlice";

const store = configureStore({
  reducer: {
    userReducer: userSlice,
    fileReducer: fileSlice,
    uploadReducer: uploadSlice,
    contextReducer: contextSlice,
    popupReducer: popupSlice,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
