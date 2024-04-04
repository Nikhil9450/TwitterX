import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "firebase/auth";
import {auth} from "../firebase"
import { Link } from 'react-router-dom';


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // const userSignOut=()=>{
  //   signOut(auth).then(()=>{
  //      console.log('sign out successful.'); 
  //   }).catch(error=>console.log(error))
  // }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openAddFilter=()=>{

  }
  const openAddRecipe=()=>{

  }
  const openBookmarks=()=>{

  }
  const openMyRecipes=()=>{

  }
  const logout_func=()=>{
    signOut(auth).then(()=>{
      console.log('sign out successful.'); 
   }).catch(error=>console.log(error))
  }

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        style={{background:'none'}}
        // endIcon={<KeyboardArrowDownIcon />}
      >
        <AccountCircleIcon style={{ fontSize: '35px' }}/>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <TuneIcon />
          <Link to="/add_filter" style={{textDecoration:'none', color:'#424242'}}>ADD FILTER</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <PostAddOutlinedIcon />
          <Link to="/add_recipe" style={{textDecoration:'none', color:'#424242'}}>ADD RECIPE</Link>
        </MenuItem>
        {/* <Divider sx={{ my: 0.5 }} /> */}
        <MenuItem onClick={handleClose} disableRipple>
          <BookmarkBorderIcon />
          BOOKMARKS
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <FastfoodIcon />
          <Link to="/my_recipes" style={{textDecoration:'none', color:'#424242'}}>MY RECIPES</Link>
        </MenuItem>
        <MenuItem onClick={logout_func} disableRipple>
          <LogoutIcon />
          LOGOUT
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
