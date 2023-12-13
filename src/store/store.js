import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';

export default configureStore({
  reducer: {
    auth: authReducer,
    // Add more reducers here if needed
  },
});