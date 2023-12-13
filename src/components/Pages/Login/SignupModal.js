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
import { useState } from 'react';
import Grid from '@mui/material/Grid'; // Grid version 1
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { signup } from '../../../actions/authActions';

// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/material/IconButton/';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
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

// const textFieldStyle = {
//   borderColor: 'red !important', // Set the desired outline color
// };


export default function SignupModal(props) {
  console.log("props----------->",props)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: null,
  });

  // const [selectedDate, setSelectedDate] = useState(null);
  // const formattedDate = selectedDate ? new Date(selectedDate).toLocaleDateString() : '';
  // const handleDateChange = (newDate) => {
  //   setSelectedDate(newDate);
  //   console.log("selected day--------->",formattedDate)
  // };

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
 
  const handleInputChange = (event) => {
    console.log("id--------------->",event.target.id);
    console.log("value--------------->",event.target.value);
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDateChange = (newDate) => {
    const formattedDate = newDate ? new Date(newDate).toLocaleDateString() : '';
    setFormData((prevData) => ({
      ...prevData,
      dateOfBirth: formattedDate,
    }));
  };
  const onSubmit =(e)=>{
    console.log("formdata---------->",formData);
    e.preventDefault();
    signup(formData);
  }
  
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
                 <div className={classes.icon_container}>
                 <CloseIcon onClick={handleCloseModal} style={{ color: 'grey' }}/>
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
                      <TextField id="name" label="Name" variant="outlined" onChange={handleInputChange}   size="small" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="phone" label="Phone no." type="number" variant="outlined" onChange={handleInputChange}  size="small" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="email" label="Email" type="email" variant="outlined" onChange={handleInputChange} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField id="password" label="Password" type="password" variant="outlined" onChange={handleInputChange}   size="small" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField id="confirmPassword" label="Confirm Password" type="Password" variant="outlined" onChange={handleInputChange}   size="small" fullWidth />
                    </Grid> 
                    <Grid item xs={12}>
                      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleInputChange} 
                      >
                        <FormControlLabel value="female" control={<Radio id="gender" />} label="Female" />
                        <FormControlLabel value="male" control={<Radio  id="gender"/>} label="Male" />
                        <FormControlLabel value="other" control={<Radio id="gender"/>} label="Other" />
                      </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <div >
                          <Typography  variant="h6" component="h6">
                            Date of birth
                          </Typography>
                          <div className={classes.date_section} >
                            <DatePicker   onChange={handleDateChange}  sx={{ height: '40px',margin:'1rem 0rem' /* Other styles */ }}  />
                          </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.submit_container}>
                        <Button variant="contained" onClick={onSubmit}  >Submit</Button>
                  </div>
            </Box>
            </Fade>
        </Modal>
      </LocalizationProvider>
    </div>
  );
}
