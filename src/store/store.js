import { configureStore } from '@reduxjs/toolkit';
import {registerReducer,loginReducer} from '../slices/AuthenticatorSlice';

export default configureStore({
  reducer: {
    signup: registerReducer,
    signin: loginReducer,
    // Add more reducers here if needed
  },
});