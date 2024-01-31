import { createSlice } from '@reduxjs/toolkit';

export const BookmarkEventSlice = createSlice({
  name: 'bookmark',
  initialState: { value: false },  // Make sure to use an object for the initialState
  reducers: {
    bookmarkEventHandler: (state, action) => {
      const { value } = action.payload;
      state.value = value;
      console.log("value------>",state.value)
    },
  },
});

export const { bookmarkEventHandler } = BookmarkEventSlice.actions;
export const BookmarkReducer = BookmarkEventSlice.reducer;