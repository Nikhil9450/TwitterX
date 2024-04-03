import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomizedSnackbars(props) {

  return (
    <div>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar open={props.open} autoHideDuration={4000} onClose={props.handleClose}
        anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      >
        <Alert
          onClose={props.handleClose}
          severity="warning"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
