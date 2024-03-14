import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "USER",
  initialState: {
    token: localStorage.getItem("token") || null,
    email: localStorage.getItem("email"),
    userUId: null,
    receiverId: null,
  },
  reducers: {
    setUserUid: (state, action) => {
      state.userUId = action.payload;
    },

    setReceiverId: (state, action) => {
      state.receiverId = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
