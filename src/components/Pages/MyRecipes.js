import React from 'react'
import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import {auth} from "../../../src/firebase";
import MyRecipe from '../MyRecipe';


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
    <div style={{padding:'1rem'}}>
      {/* <h2>My Recipes</h2> */}
      {/* <ul> */}
        {recipes.map((recipe) => (
          // <li key={recipe.id}>
          //   <h3>{recipe.title}</h3>
          //   <p>{recipe.summary}</p>
          // </li>
          <MyRecipe title={recipe.title} summary={recipe.summary} instructions={recipe.instructions} ingredients={recipe.ingredients}/>
        ))}
      {/* </ul> */}
    </div>
  );
};

export default MyRecipes;
