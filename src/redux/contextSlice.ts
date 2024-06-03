import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFile } from "../models/File.model";

interface IContext {
  x: number | null;
  y: number | null;
  file: IFile | null;
  index: number | null;
}

const initialState: IContext = {
  x: null,
  y: null,
  file: null,
  index: null,
};

const contextSlice = createSlice({
  initialState,
  name: "contextSlice",
  reducers: {
    setContextMenu(state, action: PayloadAction<IContext>) {
      state.x = action.payload.x;
      state.y = action.payload.y;
      state.file = action.payload.file;
      state.index = action.payload.index;
    },
  },
});

export const { setContextMenu } = contextSlice.actions;
export default contextSlice.reducer;
