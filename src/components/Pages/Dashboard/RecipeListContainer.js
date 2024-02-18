import React from 'react'
import classes from './RecipeListContainer.module.css';
import Recipe from '../../Recipe';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const RecipeListContainer = () => {
  const recipeList = useSelector((state) => state.recipeList.data.results);
  useEffect(()=>{
    console.log("bookmark before----->",recipeList);
  },[recipeList])

  return (
    <div className={classes.main}>
      {recipeList && recipeList.map((element, index) => (
        <Recipe key={index} title={element.title} image={element.image} />
      ))}
      <Recipe title={'Pasta'} />
    </div>
  )
}

export default RecipeListContainer