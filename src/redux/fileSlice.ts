import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFile, IFiles } from "../models/File.model";
import { updateSize } from "./userSlice";
import store from "./store";

const initialState: IFiles = {
  currentDir: -1,
  currentFiles: [],
  stack: [],
  isLoading: true,
  selected: 0,
};

interface ISwitcher {
  index: number;
}

export const fileSlice = createSlice({
  name: "fileSlice",
  initialState: initialState,
  reducers: {
    switchTrashSel(state) {
      state.currentFiles.forEach((file) =>
        file.is_selected ? (file.is_trash = !file.is_trash) : null
      );
    },

    deleteSel(state) {
      state.currentFiles = [];
    },

    selectAll(state) {
      state.currentFiles.forEach((file) => (file.is_selected = true));
      state.selected = state.currentFiles.length;
    },

    dropSelection(state) {
      state.currentFiles.forEach((i) => (i.is_selected = false));
      state.selected = 0;
    },

    switchSelection(state, action: PayloadAction<ISwitcher>) {
      const payload = action.payload;
      state.currentFiles[payload.index].is_selected ? state.selected-- : state.selected++;
      state.currentFiles[payload.index].is_selected =
        !state.currentFiles[payload.index].is_selected;
    },

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
  dropSelection,
  switchSelection,
  selectAll,
  switchTrashSel,
  deleteSel,
} = fileSlice.actions;

export default fileSlice.reducer;
