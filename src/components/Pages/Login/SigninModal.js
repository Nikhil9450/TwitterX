import * as React from 'react';
// import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classes from './SignupModal.module.css';
import { TextField } from '@mui/material';
import { useRef  } from 'react';
import Grid from '@mui/material/Grid'; // Grid version 1
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux'
import {loginUser} from '../../../slices/AuthenticatorSlice'
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../../firebase"
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
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



export default function SigninModal(props) {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  // const genderRef = useRef(null);

  const user_data = useSelector((state) => state.signin);
  const dispatch = useDispatch()
  console.log("props----------->",props)

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
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
  // Gather form data, assuming you have it in your formData state
  // const { name, email, phone, password, confirmPassword, gender, dateOfBirth } = formData;
  console.log("this formdata is in onSubmit---->",formData)
  // Dispatch the action with gathered form data
  dispatch(
    loginUser(formData)
  );

  signInWithEmailAndPassword(auth,formData.email,formData.password)
  .then((userCred)=>{
    console.log("usercred------------->",userCred);
  })
  .catch((error)=>{
    console.log(error);
  })

};
  
  return (
    <div>
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
                 <div className={classes.icon_container}>
                 <CloseIcon onClick={handleCloseModal} style={{ color: 'grey', cursor:'pointer' }}/>
                 </div> 
                <Typography id="transition-modal-title" variant="h5" component="h2">
                Login into your account.
                </Typography>
                <div className={classes.signup_form}>
                  {/* <input className={classes.input} type="text" placeholder='Name' />
                  <input className={classes.input} type="text" placeholder='Email' />
                  <input className={classes.input} type='number' placeholder='Phone no.'  /> */}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField id="email" label="Email" type="email" variant="outlined"  inputRef={emailRef} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="password" label="Password" type="password" variant="outlined"  inputRef={passwordRef}  size="small" fullWidth />
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.submit_container}>
                        <Button variant="contained"  onClick={onSubmit} >Login</Button>
                  </div>
            </Box>
            </Fade>
        </Modal>
    </div>
  );
}
