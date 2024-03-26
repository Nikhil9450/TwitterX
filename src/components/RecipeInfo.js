import React from 'react';
import classes from './RecipeInfo.module.css';
import {useSelector } from 'react-redux';

const RecipeInfo = () => {
    const recipe_info = useSelector((state) => state.recipeInformation);
    const userName = useSelector((state) => state.userName.Name);
    let firstName=null;
    if(userName){
        firstName = userName.split(" ")[0]; 
    }
    if (!recipe_info.data.extendedIngredients || !Array.isArray(recipe_info.data.extendedIngredients)) {
        return <div className={classes.not_available_container}>
                    <div className={classes.not_available}>
                        <h3>Welcome,<span className={classes.firstName}>{firstName}</span>!</h3>
                        <p>Discover endless culinary inspiration and delightful recipes here.</p> 
                    </div>
                </div>;
    }
    const createMarkup = (html) => {
        return { __html: html };
    };
  return (
    <div className={classes.recipeinfo_maincontainer}>
        <div className={classes.recipeinfo}>
            <div className={classes.recipe_img + ' ' + classes.item}>
                <img className={classes.rec_img} src={recipe_info.data.image} alt="recipe_image" />
            </div>
            <div className={classes.recipe_title + ' ' + classes.item}>
            <h4>{recipe_info.data.title}</h4>
            <p dangerouslySetInnerHTML={createMarkup(recipe_info.data.summary)} />
            </div>
            <div className={classes.recipe_ingridient + ' ' + classes.item}>
            <h3 className={classes.ing_title}>Ingrediends</h3>
            <table className={classes.ing_table}>
                {recipe_info.data.extendedIngredients.map((ingredient, index) => (
                    <tr key={index}>
                        <td>{ingredient.name}</td>
                        <td>{ingredient.measures.metric.amount} {ingredient.measures.metric.unitLong}</td>
                    </tr>
                    ))}
            </table>
            </div>
            <div className={classes.recipe_inf + ' ' + classes.item}>
            <h5>HOW TO MAKE</h5>
            <p dangerouslySetInnerHTML={createMarkup(recipe_info.data.instructions)} />
            </div>
        </div>

    </div>
  )
}

export default RecipeInfo