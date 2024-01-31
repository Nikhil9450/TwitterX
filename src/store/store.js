import { configureStore } from '@reduxjs/toolkit';
import {registerReducer,loginReducer} from '../slices/AuthenticatorSlice';
import { BookmarkReducer } from '../slices/ButtonEventSlice';
export default configureStore({
  reducer: {
    signup: registerReducer,
    signin: loginReducer,
    bookmark:BookmarkReducer,
    // Add more reducers here if needed
  },
});