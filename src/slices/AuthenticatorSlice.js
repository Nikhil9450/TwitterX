import { createSlice } from '@reduxjs/toolkit'
export const AuthenticatorSlice = createSlice({
  name: 'Registeruser',
  initialState: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: null,
  },
  reducers: {
    registerUser: (state, action) => { 
      const { name, email, phone, password, confirmPassword, dateOfBirth } = action.payload;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.password = password;
      state.confirmPassword = confirmPassword;
      state.dateOfBirth = dateOfBirth;
     console.log("payload--------->",action.payload);
     console.log("state--------->",state);
    //  (prevData) => ({
    //   ...prevData,
    //   [id]: value,
    // })
    }
  },
})

export const loginSlice = createSlice({
  name: 'Login',
  initialState: {
    email: '',
    password: '',
  },
  reducers: {
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      state.email = email;
      state.password = password;
      console.log('payload--------->', action.payload);
      console.log('state--------->', action.state);
    },
  },
});
// Action creators are generated for each case reducer function
export const { registerUser } = AuthenticatorSlice.actions
export const { loginUser } = loginSlice.actions

export const registerReducer = AuthenticatorSlice.reducer
export const loginReducer = loginSlice.reducer;