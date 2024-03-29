import React from 'react'
import classes from './Recipe.module.css'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { useDispatch,useSelector } from 'react-redux';
import {viewRecipe} from '../slices/ViewRecipeSlice';
import Loader from './Loader';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Recipe = (props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const recipe_info = useSelector((state) => state.recipeInformation);
  const navigate = useNavigate();


 function recipe_detail(id){
  setLoading(true);
   console.log("id------>",id,);
   dispatch(viewRecipe({ apiKey: "bcffb3f9bbd6414aaf1fa753f147235f", id: id,includeNutrition:true  }))
   .then(()=>{
      setLoading(false);
      navigate('/');
   })
   console.log("recipe_info--------->",recipe_info);
 }
  return (
    <div className={classes.Recipe_card}>
      <div className={classes.img_container}>
        <img className={classes.img} src={props.image} alt="recipe_image" />
      </div>
        <div className={classes.description}>
            <p className={classes.title}>{props.title}</p>
            <button className={classes.view_btn} onClick={() => recipe_detail(props.id)}>{(loading?<Loader size={20} />:<KeyboardArrowRightRoundedIcon style={{ color: 'grey'}}/>)}</button>
        </div>
    </div>
  )
}

export default Recipe