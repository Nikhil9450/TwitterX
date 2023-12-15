import { configureStore } from '@reduxjs/toolkit';
import AuthenticatorReducer from '../slices/AuthenticatorSlice';

export default configureStore({
  reducer: {
    auth: AuthenticatorReducer,
    // Add more reducers here if needed
  },
});