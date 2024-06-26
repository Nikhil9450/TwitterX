import * as React from 'react';
// import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classes from './SignupModal.module.css';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useRef,useState } from 'react';
import Grid from '@mui/material/Grid'; // Grid version 1
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import { signup } from '../../../actions/authActions';
import { useSelector, useDispatch } from 'react-redux'
import {registerUser} from '../../../slices/AuthenticatorSlice'
// import { decrement, increment } from './counterSlice'
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/material/IconButton/';
import {createUserWithEmailAndPassword,updateProfile,getAuth} from "firebase/auth";
import { useMediaQuery } from '@mui/material';
import {auth} from "../../../firebase";
import MUIalert from '../../Alert';
import Loader from '../../Loader';


// const textFieldStyle = {
//   borderColor: 'red !important', // Set the desired outline color
// };


export default function SignupModal(props) {
  const [loader,setLoader]=useState(false);
  const [open, setOpen] = useState(false);
  const [error,setError]=useState("");
  const isMobile = useMediaQuery('(max-width:650px)');

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  // const genderRef = useRef(null);
  const dobRef = useRef(null);

  const user_data = useSelector((state) => state.signup);
  const dispatch = useDispatch()
  console.log("props----------->",props)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? 300 :600,
    bgcolor: 'white',
  //   border: '2px solid #000',
    boxShadow: 24,
    borderRadius:4,
    p: 4,
  };
  const backdropStyle = {
    backgroundColor: 'rgba(91, 92, 92, 0.5)', // Change the backdrop color and opacity here
    backdropFilter: 'blur(7px)', // Add blur effect
  };
  function openAlert(){
    setOpen(true);
    setTimeout(()=>{
      closeAlert()
    },[2000])
  };
  function closeAlert(){
    setOpen(false);
  }
  const handleCloseModal = () => {
    // Call the modal close function when clicking the cross icon
    props.onClose();
    // You can add additional logic here if needed
  };
  const handleBackdropClick = (event) => {
    // Prevent the backdrop click from closing the modal
    event.stopPropagation();
    // You can add other logic here if needed
  };
 
// Function to handle form submission
const onSubmit = (e) => {
  console.log("initial values---------->",user_data)
  e.preventDefault();
  const formData = {
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
      // gender: genderRef.current.value,
      dateOfBirth: dobRef.current.value // You may need to format this value based on your DatePicker component
    };
  
    if (!formData.dateOfBirth) {
      // Handle date of birth validation error
      setError("Date of birth is required.");
      openAlert();
      return;
    }  
    if (formData.password !== formData.confirmPassword) {
      // Handle date of birth validation error
      setError("Password is not matching.");
      openAlert();
      return;
    } 
  // Gather form data, assuming you have it in your formData state
  // const { name, email, phone, password, confirmPassword, gender, dateOfBirth } = formData;
  console.log("this formdata is in onSubmit---->",formData)
  // Dispatch the action with gathered form data
  dispatch(
    registerUser(formData)
  );
  setLoader(true);
  createUserWithEmailAndPassword(auth,formData.email,formData.password)
  .then((userCred)=>{
    setLoader(false);
    console.log("usercred------------->",userCred);
    return updateProfile(userCred.user, {
      displayName: formData.name
    });
  })
  .then(() => {
    console.log("Profile updated successfully");
  })
  .catch((error)=>{
    console.log(error);
    setLoader(false);
    setError(error.message);
  }) 
};
// const onSubmit = async (e) => {
//   e.preventDefault();
//   const formData = {
//     name: nameRef.current.value,
//     phone: phoneRef.current.value,
//     email: emailRef.current.value,
//     password: passwordRef.current.value,
//     confirmPassword: confirmPasswordRef.current.value,
//     dateOfBirth: dobRef.current.value
//   };

//   if (!formData.dateOfBirth) {
//     setError("Date of birth is required.");
//     openAlert();
//     return;
//   }  
//   if (formData.password !== formData.confirmPassword) {
//     setError("Password is not matching.");
//     openAlert();
//     return;
//   } 

//   try {
//     setLoader(true);
//     // Create user with email and password
//     const userCredential = await createUserWithEmailAndPassword(getAuth(auth), formData.email, formData.password);
    
//     // Update user profile with name
//     await updateProfile(userCredential.user, {
//       displayName: formData.name
//     });

//     setLoader(false);
//     console.log("User created successfully:", userCredential.user);
//     // Optionally, you can dispatch an action to handle user registration in Redux
//     // dispatch(registerUser(userCredential.user));
//   } catch (error) {
//     setLoader(false);
//     console.error("Error creating user:", error.message);
//     setError(error.message);
//     openAlert();
//   }
// };
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>     
      {/* <button className={classes.signup_btn}>Create Account</button> */}
          {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.open}
                onClose={props.onClose}
                closeAfterTransition
                BackdropProps={{
                onClick: handleBackdropClick, // Handle backdrop click
                sx: backdropStyle,
              }}
            >
                <Fade in={props.open}>

                <Box sx={style}>
                <MUIalert message={error} severity={"warning"} open={open} openalert={openAlert} closealert={closeAlert} />

                  <form onSubmit={onSubmit}>
                      <div className={classes.icon_container}>
                      <CloseIcon onClick={handleCloseModal} style={{ color: 'grey', cursor:'pointer' }}/>
                      </div> 
                      <Typography id="transition-modal-title" variant="h5" component="h2">
                      Create your account
                      </Typography>
                      <div className={classes.signup_form}>
                        {/* <input className={classes.input} type="text" placeholder='Name' />
                        <input className={classes.input} type="text" placeholder='Email' />
                        <input className={classes.input} type='number' placeholder='Phone no.'  /> */}
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField id="name" label="Name" variant="outlined"   inputRef={nameRef} size="small" fullWidth  required/>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField id="phone" label="Phone no." type="number" variant="outlined"  inputRef={phoneRef} size="small" fullWidth required/>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField id="email" label="Email" type="email" variant="outlined"  inputRef={emailRef} size="small" fullWidth required/>
                          </Grid>
                          <Grid item xs={isMobile ? 12 :6}>
                            <TextField id="password" label="Password" type="password" variant="outlined"  inputRef={passwordRef}  size="small" fullWidth required/>
                          </Grid>
                          <Grid item xs={isMobile ? 12 :6}>
                            <TextField id="confirmPassword" label="Confirm Password" type="Password" variant="outlined"  inputRef={confirmPasswordRef}   size="small" fullWidth required/>
                          </Grid> 
                          <Grid item xs={12}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group" 
                              defaultValue="male"                  
                              required
                            >
                              <FormControlLabel value="female" control={<Radio id="gender" />} label="Female" />
                              <FormControlLabel value="male" control={<Radio  id="gender" />} label="Male" />
                              <FormControlLabel value="other" control={<Radio id="gender"/>} label="Other" />
                            </RadioGroup>
                          </Grid>
                          <Grid item xs={12}>
                              <div >
                                <Typography  variant="h6" component="h6">
                                  Date of birth
                                </Typography>
                                <div className={classes.date_section} >
                                  <DatePicker  inputRef={dobRef}  sx={{ height: '40px',margin:'1rem 0rem' /* Other styles */ }} required />
                                </div>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                      <div className={classes.submit_container}>
                          <Button variant="contained" type='submit'>{((loader)?<Loader size={30}/>:"Submit")}</Button>
                      </div>
                  </form>      
                </Box>
                </Fade>
            </Modal>
      </LocalizationProvider>
    </div>
  );
}
