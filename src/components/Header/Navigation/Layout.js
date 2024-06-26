import React from 'react';
import { Fragment } from 'react';
import Navbar from './Navbar';

const Layout = (props) => {
  return (
    <Fragment>
        <Navbar/>
        <main style={{height:'90%',overflowY:'auto'}}>{props.children}</main>
    </Fragment>
  )
}

export default Layout