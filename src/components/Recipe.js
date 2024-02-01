import React from 'react'
import classes from './Recipe.module.css'
const Recipe = (props) => {
 const recipe_detail=(id)=>{
   console.log("id------>",id,);
 }
  return (
    <div className={classes.Recipe_card}>
        <div className={classes.recipe_img}><img src={props.image} alt="" /></div>
        <div className={classes.description}>
            <title>{props.title}</title>
            <button onClick={recipe_detail(props.id)}>VIEW RECIPE</button>
        </div>
    </div>
  )
}

export default Recipe