import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "USER",
  initialState: {
    token: localStorage.getItem("token") || null,
    email: localStorage.getItem("email") || null,
    isLoggedIn: false,
    userUId: null,
    receiverId: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserUid: (state, action) => {
      state.userUId = action.payload;
    },

    setReceiverId: (state, action) => {
      state.receiverId = action.payload;
    },

    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = true;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
