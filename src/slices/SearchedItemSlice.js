// UserSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Searched_item: "",
};

const searchedItemSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchItem(state, action) {
      state.Searched_item = action.payload;
      console.log("Searched_item------>",action.payload)
    },
  },
});

export const { setSearchItem } = searchedItemSlice.actions;

export const SearchItemReducer = searchedItemSlice.reducer;
