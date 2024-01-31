import { createSlice } from '@reduxjs/toolkit'
export const BookmarkEventSlice = createSlice({
  name: 'bookmark',
  initialState: false,
  reducers: {
    bookmarkEventHandler: (state, action) => {
      const { value} = action.payload;
      state=value;
      console.log('payload--------->', action.payload);
      console.log('state after click--------->', state);
      return value;
    },
  },
});

export const { bookmarkEventHandler } = BookmarkEventSlice.actions
export const BookmarkReducer = BookmarkEventSlice.reducer;