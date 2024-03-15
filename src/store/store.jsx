import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import userSlice from "./user-slice";
import mailSlice from "./mails-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    user: userSlice.reducer,
    mails: mailSlice.reducer,
  },
});

export default store;
