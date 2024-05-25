import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFile, IFiles } from "../models/File.model";
import { updateSize } from "./userSlice";

const initialState: IFiles = {
  currentDir: -1,
  currentFiles: [],
  stack: [],
  isLoading: true,
};

interface ISwitcher {
  index: number;
}

export const fileSlice = createSlice({
  name: "fileSlice",
  initialState: initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    switchFavorite(state, action: PayloadAction<ISwitcher>) {
      const payload = action.payload;
      state.currentFiles[payload.index].is_favorite =
        !state.currentFiles[payload.index].is_favorite;
    },

    switchTrash(state, action: PayloadAction<ISwitcher>) {
      const payload = action.payload;
      state.currentFiles[payload.index].is_trash = !state.currentFiles[payload.index].is_trash;
      state.currentFiles.splice(payload.index, 1);
    },

    updateStack(state, action: PayloadAction<IFile[]>) {
      state.stack = action.payload;
    },

    setCurrentDir(state, action: PayloadAction<number>) {
      state.currentDir = action.payload;
    },

    setCurrentFiles(state, action: PayloadAction<IFile[]>) {
      state.currentFiles = action.payload;
    },

    pushFile(state, action: PayloadAction<IFile>) {
      state.currentFiles.push(action.payload);
    },

    deleteFile(state, action: PayloadAction<ISwitcher>) {
      state.currentFiles.splice(action.payload.index, 1);
    },
  },
});

export const {
  setCurrentDir,
  setCurrentFiles,
  pushFile,
  updateStack,
  switchFavorite,
  switchTrash,
  deleteFile,
  setLoading,
} = fileSlice.actions;

export default fileSlice.reducer;
