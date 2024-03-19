import React from 'react';
import classes from '../Header/FoodFilters.module.css';
import Dropdown from './Select';
import Grid from '@mui/material/Grid';
const FoodFilters = () => {
  let diet=['Gluten Free','Ketogenic','Vegetarian','Lacto-Vegetarian','Ovo-Vegetarian','Vegan','Pescetarian','Paleo','Primal','Low FODMAP','Whole30'];
  let cusines=['African','Asian','American','British','Cajun','Caribbean','Chinese','Eastern European','European','French','German','Greek','Indian','Irish','Italian','Japanese','Jewish','Korean','Latin American','Mediterranean','Mexican','Middle Eastern','Nordic','Southern','Spanish','Thai','Vietnamese',]
  let type=['main course','side dish','dessert','appetizer','salad','bread','breakfast','soup','beverage','sauce','marinade','fingerfood','snack','drink']
  return (
    <div className={classes.filters}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                {/* Content for the first column */}
                <Dropdown options={diet} title={"Select Diet"}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                {/* Content for the second column */}
                <Dropdown options={cusines} title={"Select Cusines"}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Dropdown options={type} title={"Select Food Type"}/>
                {/* Content for the third column */}
            </Grid>
        </Grid>
        {/* <Select defaultValue={10}>
            {props.options.map(option => (
                <Option key={option} value={option}>
                {option.toUpperCase()}
                </Option>
            ))}
        </Select> */}
    </div>
  )
}

export default FoodFilters