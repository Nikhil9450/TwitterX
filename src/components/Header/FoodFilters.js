import React from 'react';
import classes from '../Header/FoodFilters.module.css';
import Dropdown from './Select';
import Grid from '@mui/material/Grid';
const FoodFilters = () => {
  return (
    <div className={classes.filters}>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
            {/* Content for the first column */}
            <Dropdown/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
            {/* Content for the second column */}
            <Dropdown/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
        <Dropdown/>
            {/* Content for the third column */}
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
            {/* Content for the fourth column */}
            <Dropdown/>
        </Grid>
        </Grid>
    </div>
  )
}

export default FoodFilters