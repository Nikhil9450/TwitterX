import React from 'react'
import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import {auth} from "../../../src/firebase";
import MyRecipe from '../MyRecipe';
import classes from './MyRecipes.module.css'
import Grid from '@mui/material/Grid';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const user = auth.currentUser;
  const userId = user ? user.uid : '';

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
      console.log("recipedata from firestore----------->", recipesData);
      setRecipes(recipesData);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchRecipes();
    }
  }, [userId]);

  // const handleDeleteRecipe = async (recipeId) => {
  //   setLoading(true);
  //   try {
  //     const db = getFirestore();
  //     const recipeDoc = doc(db, 'users', userId, 'recipes', recipeId);
  //     await deleteDoc(recipeDoc);
  //     setLoading(false);
  //     // After deletion, fetch and update the recipes list
  //     fetchRecipes();
  //   } catch (error) {
  //     setLoading(false);
  //     console.error('Error deleting recipe:', error);
  //   }
  // };
  return (
    <div className={classes.recipe_container} >
    <div className={classes.upper_page}>
     <img src="Images/fried-egg.png" alt="food_img" style={{height:'15rem'}} />
    </div>
     <div className={classes.recipes_list}>
     <Grid container spacing={2}> 
          {recipes.map((recipe) => (
            <Grid item xs={6}>
              <MyRecipe userId={userId} key={recipe.id} recipeId={recipe.id} title={recipe.title} summary={recipe.summary} instructions={recipe.instructions} ingredients={recipe.ingredients} fetchRecipes={() => fetchRecipes()}/>
            </Grid>
          ))}
      </Grid>
     </div>
    </div>
  );
};

export default MyRecipes;
