import React from 'react';
import classes from './MainContainer.module.css';
import RecipeInfo from '../../RecipeInfo';
import { useDispatch,useSelector } from 'react-redux';


const MainContainer = (props) => {
  const recipe_info = useSelector((state) => state.recipeInformation);
  return (
      <div className={classes.main}>
        {(recipe_info?<RecipeInfo img={recipe_info.data.image} title={recipe_info.data.title} ingredients={recipe_info.data.extendedIngredients} summary={recipe_info.data.summary} instructions={recipe_info.data.instructions}/>:"")}
      </div>
  )
}

export default MainContainer