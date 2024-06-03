import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserProperty } from "../models/User.model";

export const initialState: IUser = {
  id: 0,
  username: "johndoe",
  email: "johndoe@mail.ru",
  disk_space: 1024 * 500,
  used_space: 1024 * 102.22,
  gender: "",
  isAuth: false,
  root_directory: 0,
  theme: "light",
  avatar: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAvatar(state, action: PayloadAction<string>) {
      state.avatar = action.payload;
    },

    updateSize(state, action: PayloadAction<number>) {
      state.used_space = Number(state.used_space) + Number(action.payload);
    },

    setUser(state, action: PayloadAction<IUser>) {
      return { ...action.payload };
    },

    setUserProperty(state, action: PayloadAction<IUserProperty>) {
      const { property, value } = action.payload;
      return {
        ...state,
        [property]: value,
      };
    },
  },
});

export const { setUser, updateAvatar, setUserProperty, updateSize } = userSlice.actions;
export default userSlice.reducer;
