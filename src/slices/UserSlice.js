// UserSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Name: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName(state, action) {
      state.Name = action.payload;
      console.log("action payload user name------>",action.payload)
    },
  },
});

export const { setUserName } = userSlice.actions;

export const userReducer = userSlice.reducer;
