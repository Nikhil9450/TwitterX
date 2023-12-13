import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from './actionTypes';

export const signup = (userData) => {
  // Here you would usually have an API call for signup
  // For demonstration, let's simulate success/failure

  // Simulating a successful signup
  const success = true; // Replace this with your actual API call
  if (success) {
    return {
      type: SIGNUP_SUCCESS,
      payload: userData,
    };
  } else {
    return {
      type: SIGNUP_FAILURE,
      payload: 'Signup failed. Please try again.',
    };
  }
};