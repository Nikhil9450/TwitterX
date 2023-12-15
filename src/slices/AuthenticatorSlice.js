import { createSlice } from '@reduxjs/toolkit'

export const AuthenticatorSlice = createSlice({
  name: 'Registeruser',
  initialState: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      // gender: '',
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
      // state.gender = gender;
      state.dateOfBirth = dateOfBirth;
     console.log("payload--------->",action.payload);
     console.log("state--------->",action.state);
    //  (prevData) => ({
    //   ...prevData,
    //   [id]: value,
    // })
    }
  },
})

// Action creators are generated for each case reducer function
export const { registerUser } = AuthenticatorSlice.actions

export default AuthenticatorSlice.reducer