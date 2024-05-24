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
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateSize(state, action: PayloadAction<number>) {
      // console.log("update size", action.payload, state.used_space);

      console.log(
        Number(state.used_space),
        " + ",
        Number(action.payload),
        " -> ",
        Number(state.used_space + action.payload)
      );
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

export const { setUser, setUserProperty, updateSize } = userSlice.actions;
export default userSlice.reducer;
