import React from 'react'
import classes from './Recipe.module.css'
const Recipe = (props) => {
 const recipe_detail=(id)=>{
   console.log("id------>",id,);
 }
  return (
    <div className={classes.Recipe_card}>
        <img className={classes.img} src={props.image} alt="recipe_image" />
        <div className={classes.description}>
            <p className={classes.title}>{props.title}</p>
            <button onClick={recipe_detail(props.id)}>VIEW RECIPE</button>
        </div>
    </div>
  )
}

export default Recipe