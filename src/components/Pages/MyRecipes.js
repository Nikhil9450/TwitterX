import React from 'react'
import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import {auth} from "../../../src/firebase";
import MyRecipe from '../MyRecipe';
import classes from './MyRecipes.module.css'

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const user = auth.currentUser;
  const userId = user ? user.uid : '';

  useEffect(() => {
    if (userId) {
      const fetchRecipes = async () => {
        try {
          const db = getFirestore();
          const recipesRef = collection(db, 'users', userId, 'recipes');
          const q = query(recipesRef);

          const querySnapshot = await getDocs(q);
          const recipesData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("recipedata from firestore----------->",recipesData);
          setRecipes(recipesData);
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      };

      fetchRecipes();
    }
  }, [userId]);

  return (
    <div className={classes.recipe_container} >
    <div className={classes.upper_page}>
     <img src="Images/fried-egg.png" alt="food_img" style={{height:'15rem'}} />
    </div>
     <div className={classes.recipes_list}>
        {recipes.map((recipe) => (
          <MyRecipe title={recipe.title} summary={recipe.summary} instructions={recipe.instructions} ingredients={recipe.ingredients}/>
        ))}
     </div>
    </div>
  );
};

export default MyRecipes;
