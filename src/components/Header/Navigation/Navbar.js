import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
const Navbar = () => {
  return (
    <header>
        <Link to="/"> <div className={classes.logo}> X </div> </Link>
        <nav>
         <ul>
            <li><Link to="/dashboard">Dash board</Link></li>
            <li><Link to="/">Login</Link></li>
         </ul>
        </nav>
    </header>
  )
}

export default Navbar