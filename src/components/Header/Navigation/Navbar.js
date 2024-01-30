import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import { signOut } from "firebase/auth";
import {auth} from "../../../firebase"
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const Navbar = () => {
  const userSignOut=()=>{
    signOut(auth).then(()=>{
       console.log('sign out successful.'); 
    }).catch(error=>console.log(error))
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
  return (
    <header>
        <Link to="/"> <div className={classes.logo}><img className={classes.icon} src = 'Icons/Colored_LOGO.png' alt='twitter icon'></img></div> </Link>

        <div className={classes.search_container}>
              <input type="text" />
              <button className={classes.search_btn}><SearchIcon/></button>
            </div> 
        <nav>
          <div className={classes.bookmark_container}>
            <button className={classes.bookmark_btn}><BookmarkBorderIcon style={{ color: 'orange',fontSize: '2rem' }}/></button>
            <button className={classes.signout_btn} onClick={userSignOut}>Signout</button>
          </div>
         {/* <ul>
            <li>    */}
      
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
          </Search> */}

          {/* </li>
            <li><button className={classes.bookmark_btn}><BookmarkBorderIcon style={{ color: 'orange',fontSize: '2rem' }}/></button></li>
            <li><button className={classes.signout_btn} onClick={userSignOut}>Signout</button></li>
         </ul> */}
        </nav>
    </header>
  )
}

export default Navbar