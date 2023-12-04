import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
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
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
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

  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayChange = (newDate) => {
    setSelectedDay(newDate);
    console.log("selected day--------->",selectedDay)
  };
  return (
    <div>
 <LocalizationProvider dateAdapter={AdapterDayjs}>      {/* <button className={classes.signup_btn}>Create Account</button> */}
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.open}
            onClose={props.onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
                timeout: 500,
                sx: backdropStyle,
            },
            }}
        >
            <Fade in={props.open}>
            <Box sx={style}>
                <Typography id="transition-modal-title" variant="h5" component="h2">
                Create your account
                </Typography>
                <div className={classes.signup_form}>
                {/* <input className={classes.input} type="text" placeholder='Name' />
                <input className={classes.input} type="text" placeholder='Email' />
                <input className={classes.input} type='number' placeholder='Phone no.'  /> */}
                    <TextField id="outlined-basic" label="Name" variant="outlined"   size="small"/>
                    <TextField id="outlined-basic" label="Phone no." type="number" variant="outlined"   size="small" />
                    <TextField id="outlined-basic" label="Email" type="email" variant="outlined"   size="small"/>
                    <TextField id="outlined-basic" label="Password" type="password" variant="outlined"   size="small"/>
                    <TextField id="outlined-basic" label="Confirm Password" type="Password" variant="outlined"   size="small"/>

                </div>
                <div>
                <Typography  variant="h7" component="h7">
                Date of birth
                </Typography>
                    <div className={classes.date_section}>
                    <DatePicker label={'"day"'}   value={selectedDay} onChange={handleDayChange} views={['day']} sx={{ width: '200px', height: '40px', fontSize: '16px' }} size="small"/>
                    <DatePicker label={'"month"'} views={['month']} sx={{ width: '200px',height:'50px', fontSize: '16px' }} size="small"/>
                    <DatePicker label={'"year"'} views={['year']} sx={{ width: '200px', height:'50px', fontSize: '16px' }} size="small" />
                    </div>
                    <div className={classes.submit_container}>
                        <Button variant="contained"  >Submit</Button>
                    </div>
                </div>

            </Box>
            </Fade>
        </Modal>
      </LocalizationProvider>
    </div>
  );
}
