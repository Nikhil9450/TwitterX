import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';


export default function TransitionsModal(props) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: props.width,
    height: props.height,
    bgcolor: 'white',
  //   border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    // overflow:'auto',
    padding:'0px'
  };
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={props.handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
          <div style={{display:'flex', justifyContent:'space-between', padding:'1.5rem 1rem' ,background:'#121817' }}>
          <h3 style={{color:'#b2b2b2',margin:'0px', fontWeight:'100',fontSize:'25px'}}>{props.title}</h3>
          <CloseIcon onClick={props.handleClose}  style={{cursor:'pointer',color:'white'}}/>
          </div>
           {props.children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}