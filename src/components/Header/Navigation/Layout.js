import React from 'react';
import { Fragment } from 'react';
import Navbar from './Navbar';
const Layout = (props) => {
  return (
    <Fragment>
        <Navbar toggleDrawer={props.toggleDrawer}/>
        <main style={{height:'90%',overflowY:'auto'}}>{props.children}</main>
    </Fragment>
  )
}

export default Layout