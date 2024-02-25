import React from 'react';
import classes from './RecipeInfo.module.css';

const RecipeInfo = (props) => {
    console.log("props---------->",props)
    if (!props.ingredients || !Array.isArray(props.ingredients)) {
        return <div>No ingredients available</div>;
    }
    const createMarkup = (html) => {
        return { __html: html };
    };
  return (
    <div className={classes.recipeinfo}>
        <div className={classes.recipe_img + ' ' + classes.item}>
            <img className={classes.rec_img} src={props.img} alt="recipe_image" />
        </div>
        <div className={classes.recipe_title + ' ' + classes.item}>
           <h4>{props.title}</h4>
           <p dangerouslySetInnerHTML={createMarkup(props.summary)} />
        </div>
        <div className={classes.recipe_ingridient + ' ' + classes.item}>

           <table>
            {props.ingredients.map((ingredient, index) => (
                <tr key={index}>
                    <td>{ingredient.name}</td>
                    <td>{ingredient.measures.metric.amount} {ingredient.measures.metric.unitLong}</td>
                </tr>
                ))}
           </table>
        </div>
        <div className={classes.recipe_inf + ' ' + classes.item}>
        <p dangerouslySetInnerHTML={createMarkup(props.instructions)} />
        </div>

    </div>
  )
}

export default RecipeInfo