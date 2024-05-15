import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../models/IUser";

export const initialState: IUser = {
  id: 0,
  username: "johndoe",
  email: "johndoe@mail.ru",
  disk_space: 1024 * 500,
  used_space: 1024 * 102.22,
  gender: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      // console.log("settings user");
      // console.log(state, action);

      return { ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
