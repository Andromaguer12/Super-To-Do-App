import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
import { autoSelect } from "../functions/utils";

const initialState = {
  user: { auth: "null" },
};

// reducer and actions

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// selectors
export const getUser = createDraftSafeSelector(
  autoSelect,
  (state) => state.UserSlice.user
);

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
