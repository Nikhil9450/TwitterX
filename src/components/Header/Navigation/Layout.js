import React from 'react';
import { Fragment } from 'react';
import Navbar from './Navbar';
import FoodFilters from '../FoodFilters';
const Layout = (props) => {
  return (
    <Fragment>
        <Navbar/>
        <FoodFilters/>
        <main>{props.children}</main>
    </Fragment>
  )
}

export default Layout