import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const PopupSlice = createSlice({
  initialState,
  name: "popupSlice",
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { setName } = PopupSlice.actions;
export default PopupSlice.reducer;
