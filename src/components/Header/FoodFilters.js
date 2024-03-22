// FoodFilters.js

import React, { useState, useEffect } from 'react';
import classes from '../Header/FoodFilters.module.css';
import Dropdown from './Select';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux'
import { DropdownEventHandler } from '../../slices/DropdownFilteredListSlice';
import { fetchRecipe } from '../../slices/SearchRecipeSlice';
const FoodFilters = () => {
    const dispatch = useDispatch();
    const selected_filters = useSelector((state) => state.dropDownlist);
    let dietOptions=['Gluten Free','Ketogenic','Vegetarian','Lacto-Vegetarian','Ovo-Vegetarian','Vegan','Pescetarian','Paleo','Primal','Low FODMAP','Whole30'];
    let cuisineOptions=['African','Asian','American','British','Cajun','Caribbean','Chinese','Eastern European','European','French','German','Greek','Indian','Irish','Italian','Japanese','Jewish','Korean','Latin American','Mediterranean','Mexican','Middle Eastern','Nordic','Southern','Spanish','Thai','Vietnamese',]
    let foodTypeOptions=['main course','side dish','dessert','appetizer','salad','bread','breakfast','soup','beverage','sauce','marinade','fingerfood','snack','drink']
  const [diet, setDiet] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [foodType, setFoodType] = useState([]);
  
  const handleDietChange = (event) => {
    setDiet(event.target.value);
  };

  const handleCuisinesChange = (event) => {
    setCuisines(event.target.value);
  };

  const handleFoodTypeChange = (event) => {
    setFoodType(event.target.value);
  };

  const searchFilters=()=>{
    console.log('diet----------->',diet);
    console.log('cuisines----------->',cuisines);
    console.log('foodType----------->',foodType);
    dispatch(DropdownEventHandler({ filters:{'diet':diet,'cuisines':cuisines,'type':foodType} }));
    dispatch(fetchRecipe({ apiKey: "bcffb3f9bbd6414aaf1fa753f147235f",number:10 , diet:diet, cuisine:cuisines, type:foodType }));

  }
  
  // useEffect(() => {
  //   console.log('selected_filters updated:', selected_filters);
  //   dispatch(fetchRecipe({ apiKey: "bcffb3f9bbd6414aaf1fa753f147235f",number:10 , diet:selected_filters.filters.diet, cuisines:selected_filters.filters.cuisines, type:selected_filters.filters.type }));
  // }, [selected_filters]);

  return (
    <div className={classes.filters}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Dropdown options={dietOptions} value={diet} onChange={handleDietChange} title="Select Diet" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Dropdown options={cuisineOptions} value={cuisines} onChange={handleCuisinesChange} title="Select Cuisines" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Dropdown options={foodTypeOptions} value={foodType} onChange={handleFoodTypeChange} title="Select Food Type" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
        <div className={classes.filter_search_container}>
            <Button onClick={searchFilters} variant="contained" style={{height:"100%"}}>Search</Button>
        </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default FoodFilters;
