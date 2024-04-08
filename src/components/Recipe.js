import React from 'react'
import classes from './Recipe.module.css'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { useDispatch,useSelector } from 'react-redux';
import {viewRecipe} from '../slices/ViewRecipeSlice';
import Loader from './Loader';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {setDrawer} from '../slices/RecipeDrawerSlice';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { likeRecipe,unlikeRecipe } from '../slices/LikedRecipeListSlice';


const Recipe = (props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const recipe_info = useSelector((state) => state.recipeInformation);
  const liked_recipe_list= useSelector((state)=>state.Favourates.likedList);
  const navigate = useNavigate();
  


 function recipe_detail(id){
  setLoading(true);
   console.log("id------>",id,);
   dispatch(viewRecipe({ apiKey: "bcffb3f9bbd6414aaf1fa753f147235f", id: id,includeNutrition:true  }))
   .then(()=>{
      setLoading(false);
      navigate('/');
      dispatch(setDrawer(false));
   })
   console.log("recipe_info--------->",recipe_info);
 }
 function addToLikedArray(event){
  if (event.target.checked) {
    dispatch(likeRecipe(props.id));
  } else {
    dispatch(unlikeRecipe(props.id));
  }
 }
  return (
    <div className={classes.Recipe_card}>
      <div className={classes.img_container}>
        <img className={classes.img} src={props.image} alt="recipe_image" />
      </div>
        <div className={classes.description}>
            <p className={classes.title}>{props.title}</p>
            <div className={classes.checkbox_container}>
              <Checkbox  icon={<FavoriteBorder style={{ color:'#b1b1b1'}}/>} onChange={addToLikedArray} checkedIcon={<Favorite style={{ color:'#d45311'}}/>} checked={liked_recipe_list.includes(props.id)}/>
              <button className={classes.view_btn} onClick={() => recipe_detail(props.id)}>{(loading?<Loader size={20} />:<KeyboardArrowRightRoundedIcon style={{ color: 'grey'}}/>)}</button>
            </div>
        </div>
    </div>
  )
}

export default Recipe