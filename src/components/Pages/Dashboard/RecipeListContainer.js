import React from 'react'
import classes from './RecipeListContainer.module.css';
import Recipe from '../../Recipe';
const RecipeListContainer = () => {
  return (
    <div className={classes.main}>
      <Recipe />
    </div>
  )
}

export default RecipeListContainer