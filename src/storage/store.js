import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import UserSlice from "./UserSlice";

const AppReducers = {
  UserSlice,
};

export default configureStore({
  reducer: AppReducers,
  middleware: [thunk],
  devTools: true,
});
