import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
// import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
// import Button from '@mui/material/Button';
// import CloseIcon from '@mui/icons-material/Close';

export default function MUIalert(props) {


  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={props.open}>
        <Alert
          severity={props.severity}
        //   action={
        //     <IconButton
        //       aria-label="close"
        //       color="inherit"
        //       size="small"
        //       onClick={props.closealert}
        //     >
        //       <CloseIcon fontSize="inherit" />
        //     </IconButton>
        //   }
          sx={{ mb: 2 }}
        >
         {props.message}
        </Alert>
      </Collapse>
      {/* <Button
        disabled={props.open}
        variant="outlined"
        onClick={props.openalert}
      >
        Re-open
      </Button> */}
    </Box>
  );
}