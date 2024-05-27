// @ts-nocheck
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUploadingFile, IUploadingFiles } from "../models/File.model";

interface IChangeProgress {
  id: number;
  progress: number;
}

const initialState: IUploadingFiles = {
  files: [],
};

export const uploadSlice = createSlice({
  name: "uploadSlice",
  initialState: initialState,
  reducers: {
    pushUFile(state: IUploadingFiles, action: PayloadAction<IUploadingFile>) {
      state.files.push(action.payload);
    },

    changeProgress(state: IUploadingFiles, action: PayloadAction<IChangeProgress>) {
      const { id, progress } = action.payload;
      state.files.forEach((file) => {
        if (file.id === id) {
          file.progress = progress;
        }
        return file;
      });
    },

    removeUFile(state, action: PayloadAction<IUploadingFile>) {
      let index = 0;
      for (let i = 0; i < state.files.length; i++) {
        if (state.files[i].id === action.payload.id) {
          index = i;
          break;
        }
      }
      state.files.splice(index, 1);
    },
    makeError(state, action: PayloadAction<IUploadingFile>) {
      const { id } = action.payload;
      state.files.forEach((file) => {
        if (file.id === id) {
          file.error = "err";
        }
        return file;
      });
    },
  },
});

export const { pushUFile, changeProgress, removeUFile, makeError } = uploadSlice.actions;

export default uploadSlice.reducer;
