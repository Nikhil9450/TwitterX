import React from 'react'
import FoodFilters from '../FoodFilters'
import classes from './AddFilter.module.css'
const AddFilter = () => {
  return (
    <div className={classes.foodFilter_container}>
      <FoodFilters/>
    </div>
  )
}

export default AddFilter