import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import { signOut } from "firebase/auth";
import {auth} from "../../../firebase"

const Navbar = () => {
  const userSignOut=()=>{
    signOut(auth).then(()=>{
       console.log('sign out successful.'); 
    }).catch(error=>console.log(error))
}
  return (
    <header>
        <Link to="/"> <div className={classes.logo}> X </div> </Link>
        <nav>
         <ul>
            <li><Link to="/dashboard">Dash board</Link></li>
            <li><button onClick={userSignOut}>Signout</button></li>
         </ul>
        </nav>
    </header>
  )
}

export default Navbar