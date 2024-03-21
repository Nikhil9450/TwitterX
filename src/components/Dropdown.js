import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function SplitButton(props) {
const options = props.options;

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  // const handleClick = () => {
  //   console.info(`You clicked ${options[selectedIndex]}`);
  // };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    console.log("this is event-------->",event);
    console.log("this is index-------->",index);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        style={{minWidth:'15rem', display:'flex', justifyContent:'end', boxShadow:'none', background:'#071616'}}
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
            <div style={{padding:'.3rem 1rem',color:'#c2c0c0',width:'100%', display:'flex',flexDirection:'row'}}>
                <AccountCircleIcon style={{fontSize:'2.3rem', margin:'auto 5px auto 0px'}}/>
                <div>
                    <p style={{margin:'0px'}}>{props.username}</p>
                    <p style={{margin:'0px', fontSize:'small'}}>{props.email}</p>
                </div>
             </div>
        <Button 
        style={{maxWidth:'40px' , background:'rgb(28 55 64)'}}
          size="small"
        //   aria-controls={open ? 'split-button-menu' : undefined}
        //   aria-expanded={open ? 'true' : undefined}
        //   aria-label="select merge strategy"
        //   aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem style={{ width: '15rem',display: 'flex', flexDirection: 'column', marginTop:'20px'}}>
                  {options.map((option, index) => (
                    <MenuItem
                       style={{width:'100%' }}
                      key={option}
                    //   disabled={index === 2}
                      selected={index === selectedIndex}
                    //   onClick={(event) => handleMenuItemClick(event, index)}
                      onClick={((index===0) ? () => props.handleclick() :(event) => handleMenuItemClick(event, index))}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}