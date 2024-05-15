import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  username: "",
  email: "",
  disk_space: 0,
  used_space: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload.user;
      state.id = user.id;
      state.username = user.username;
      state.email = user.email;
      state.disk_space = user.disk_space;
      state.used_space = user.used_space;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
