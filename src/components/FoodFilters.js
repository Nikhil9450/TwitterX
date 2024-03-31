// FoodFilters.js

import React, { useState, useEffect } from 'react';
import classes from './FoodFilters.module.css';
import Dropdown from './Header/Select';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux'
import { DropdownEventHandler } from '../slices/DropdownFilteredListSlice';
import { fetchRecipe } from '../slices/SearchRecipeSlice';
import MySlider from './Slider';
import Fab from '@mui/material/Fab';
import { setSearchItem } from '../slices/SearchedItemSlice';
import Loader from './Loader';
const FoodFilters = () => {
    const dispatch = useDispatch();
    const selected_filters = useSelector((state) => state.dropDownlist);
    let dietOptions=['Gluten Free','Ketogenic','Vegetarian','Lacto-Vegetarian','Ovo-Vegetarian','Vegan','Pescetarian','Paleo','Primal','Low FODMAP','Whole30'];
    let cuisineOptions=['African','Asian','American','British','Cajun','Caribbean','Chinese','Eastern European','European','French','German','Greek','Indian','Irish','Italian','Japanese','Jewish','Korean','Latin American','Mediterranean','Mexican','Middle Eastern','Nordic','Southern','Spanish','Thai','Vietnamese',]
    let foodTypeOptions=['main course','side dish','dessert','appetizer','salad','bread','breakfast','soup','beverage','sauce','marinade','fingerfood','snack','drink']
  const [diet, setDiet] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [foodType, setFoodType] = useState([]);
  const [protein, setProtein] = useState([10,100]);
  const [carbs, setCarbs] = useState([10,100]);
  const [fat, setFat] = useState([1,100]);
  const [fiber, setFiber] = useState([0,100]);
  const [iron, setIron] = useState([0,100]);
  const [sugar, setSugar] = useState([0,100]);
  const [loading, setLoading] = useState(false);
  const [data,setData]=useState({
                                  apiKey: "bcffb3f9bbd6414aaf1fa753f147235f",
                                  number:10 ,
                                  diet:diet,
                                  cuisine:cuisines,
                                  type:foodType,
                                  "maxProtein": protein[1],
                                  "minProtein": protein[0],
                                  "maxCarbs": carbs[1],
                                  "minCarbs": carbs[0],
                                  "maxFat": fat[1],
                                  "minFat": fat[0],
                                  "maxFiber": fiber[1],
                                  "minFiber": fiber[0],
                                  "maxIron": iron[1],
                                  "minIron": iron[0],
                                  "maxSugar": sugar[1],
                                  "minSugar": sugar[0]
                              });
const handleDietChange = (event) => {
  setDiet(event.target.value);
  setData((prevData) => ({
    ...prevData,
    diet: event.target.value,
  }));
};

const handleCuisinesChange = (event) => {
  setCuisines(event.target.value);
  setData((prevData) => ({
    ...prevData,
    cuisine: event.target.value,
  }));
};

const handleFoodTypeChange = (event) => {
  setFoodType(event.target.value);
  setData((prevData) => ({
    ...prevData,
    type: event.target.value,
  }));
};

  const handleProteinChange = (value) => {
    // setProtien(value);
    setProtein(value);
      setData(prevData => ({
      ...prevData, // Spread the previous data to retain existing key-value pairs
      maxProtein: value[1],
      minProtein: value[0] // Add a new key-value pair
    }));
  };
  const handleCarbsChange = (value) => {
      setCarbs(value);
      setData(prevData => ({
      ...prevData, // Spread the previous data to retain existing key-value pairs
      maxCarbs: value[1],
      minCarbs: value[0] // Add a new key-value pair
    })
    );
};
  const handleFatChange = (value) => {
      setFat(value);
      setData(prevData => ({
      ...prevData, // Spread the previous data to retain existing key-value pairs
      maxFat: value[1],
      minFat: value[0] // Add a new key-value pair
    })
    );
  
  };
  const handleFiberChange = (value) => {
      setFiber(value);
      setFiber[1]=value[1];
      setData(prevData => ({
      ...prevData, // Spread the previous data to retain existing key-value pairs
      maxFiber: value[1],
      minFiber: value[0] // Add a new key-value pair
    })
    );
  };
  const handleIronChange = (value) => {
      setIron(value);
      setData(prevData => ({
      ...prevData, // Spread the previous data to retain existing key-value pairs
      maxIron: value[1],
      minIron: value[0] // Add a new key-value pair
    })
    );
  };
  const handleSugarChange = (value) => {
      setSugar(value);
      setData(prevData => ({
      ...prevData, // Spread the previous data to retain existing key-value pairs
      maxSugar: value[1],
      minSugar: value[0] // Add a new key-value pair
    })
    );

  };
  const searchFilters=()=>{
    // console.log('diet----------->',diet);
    // console.log('cuisines----------->',cuisines);
    // console.log('foodType----------->',foodType);
    // console.log('protein----------->',protein);
    // console.log('carbs----------->',carbs);
    // console.log('fat----------->',fat);
    // console.log('fiber----------->',fiber);
    // console.log('iron----------->',iron);
    // console.log('sugar----------->',sugar);
    // console.log('data----------->',data);
    setLoading(true);
    dispatch(setSearchItem(""));
    dispatch(DropdownEventHandler({ 
      filters:{
        'diet':diet,
        'cuisines':cuisines,
        'type':foodType,
        "minProtein": protein[0],
        "maxProtein": protein[1],
        "minCarbs": carbs[0],
        "maxCarbs": carbs[1],
        "minFat": fat[0],
        "maxFat": fat[1],
        "minFiber": fiber[0],
        "maxFiber": fiber[1],
        "minIron": iron[0],
        "maxIron": iron[1],
        "minSugar": sugar[0],
        "maxSugar": sugar[1],
      } 
    }));
    dispatch(fetchRecipe(data))
    .then(()=>{
      setLoading(false);
    })

  }
  
  useEffect(() => {
    console.log('selected_filters updated:', selected_filters);
  //  dispatch(fetchRecipe({ apiKey: "bcffb3f9bbd6414aaf1fa753f147235f",number:10 , diet:selected_filters.filters.diet, cuisines:selected_filters.filters.cuisines, type:selected_filters.filters.type }));
  }, [selected_filters]);

  return (
    <div className={classes.filters}>
      <Grid container spacing={1} style={{background:'white',padding:' 1rem', borderRadius:'1rem',marginBottom:'1rem'}}>
        <Grid  item xs={12} sm={4}>
            <Dropdown options={dietOptions} value={diet} onChange={handleDietChange} title="Select Diet" />
          </Grid>
          <Grid  item xs={12} sm={4}>
            <Dropdown options={cuisineOptions} value={cuisines} onChange={handleCuisinesChange} title="Select Cuisines" />
          </Grid>
          <Grid  item xs={12} sm={4}>
            <Dropdown options={foodTypeOptions} value={foodType} onChange={handleFoodTypeChange} title="Select Food Type" />
          </Grid>
      </Grid>
      <Grid container className={classes.nutrition} spacing={1}>

          <Grid  item xs={12} sm={4}>
            <MySlider label={'Protein'} min={10} max={100} onChange={handleProteinChange} minSelected={protein[0]} maxSelected={protein[1]} minDistance={10}/>
          </Grid>

          <Grid  item xs={12} sm={4}>
            <MySlider label={'Carbs'}  min={10} max={100} onChange={handleCarbsChange} minSelected={carbs[0]} maxSelected={carbs[1]} minDistance={10}/>
          </Grid>
          <Grid  item xs={12} sm={4}>
            <MySlider label={'Fat'}  min={1} max={100} onChange={handleFatChange} minSelected={fat[0]} maxSelected={fat[1]} minDistance={10}/>
          </Grid>
          <Grid  item xs={12} sm={4}>
            <MySlider label={'Fiber'}  min={0} max={100} onChange={handleFiberChange} minSelected={fiber[0]} maxSelected={fiber[1]} minDistance={10}/>
          </Grid>
          <Grid  item xs={12} sm={4}>
            <MySlider label={'Iron'}  min={0} max={100} onChange={handleIronChange} minSelected={iron[0]} maxSelected={iron[1]} minDistance={10}/>
          </Grid>
          <Grid  item xs={12} sm={4}>
            <MySlider label={'Sugar'}  min={0} max={100} onChange={handleSugarChange} minSelected={sugar[0]} maxSelected={sugar[1]} minDistance={10}/>
          </Grid>
          {/* <Grid  item xs={12} sm={4}>
            <MySlider label={'Vitamin A'}/>
          </Grid>
          <Grid  item xs={12} sm={4}>
            <MySlider label={'Vitamin B'}/>
          </Grid>
          <Grid  item xs={12} sm={4}>
            <MySlider label={'Vitamin C'}/>
          </Grid>
          <Grid  item xs={12} sm={4}>
            <MySlider label={'Vitamin D'}/>
          </Grid>
          <Grid  item xs={12} sm={4}>
            <MySlider label={'Vitamin E'}/>
          </Grid>
          <Grid  item xs={12} sm={4}>
            <MySlider label={'Vitamin B'}/>
          </Grid> */}
        
      </Grid>
      <div className={classes.applyfilter_btn}>
      <Fab variant="extended" style={{minWidth:'20rem',minHeight:'4rem'}} onClick={searchFilters}>
        {(loading?<Loader size={30} />:'Apply Filters')}
      </Fab>
      </div>
    </div>
  );
};

export default FoodFilters;
