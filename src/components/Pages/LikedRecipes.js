import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, getDocs,deleteDoc,doc } from 'firebase/firestore';
import { auth } from "../../../src/firebase";
import classes from './LikedRecipes.module.css';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import LikedRecipe from '../LikedRecipe';
import { useMediaQuery } from '@mui/material';
import Loader from '../Loader';

const LikedRecipes = () => {
  const [recipeIdList, setRecipeIdList] = useState([]);
  const [recipesList,setRecipesList]= useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;
  const userId = user ? user.uid : '';
  const isMobile = useMediaQuery('(max-width:550px)');

  const fetchList = async () => {
    try {
      const db = getFirestore();
      const recipesRef = collection(db, 'users', userId, 'Liked_recipes');
      const q = query(recipesRef);
  
      const querySnapshot = await getDocs(q);
      const recipesListData = querySnapshot.docs.map(doc => doc.data());
      setRecipeIdList(recipesListData[0].recipeIds);
      console.log("recipesListData[0].recipeIds-------->",recipesListData[0].recipeIds);

    } catch (error) {
      console.error('Error fetching liked recipes:', error);
    }
  };



  useEffect(() => {
    fetchList();
  }, []); // Empty dependency array to run once on component mount

  const recipe_detail = async ids => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=bcffb3f9bbd6414aaf1fa753f147235f`);
      console.log("API Response:", response.data);
      setRecipesList(response.data);
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      console.error("Error fetching recipe details:", error);
    }
  };

  // const refreshafterDeletion = async () => {
  //   try {
  //     await fetchList(); // Wait for fetchList to complete
  //     await recipe_detail(recipeIdList.join(',')); // Wait for recipe_detail to complete
  //   } catch (error) {
  //     console.error('Error refreshing recipes after deletion:', error);
  //   }
  // };

  const refreshafterDeletion = async () => {
    try {
      await fetchList(); // Wait for fetchList to complete and update recipeIdList
      // Only call recipe_detail if there are recipe IDs to fetch
      if (recipeIdList.length > 0 && recipesList.length === 0) {
        await recipe_detail(recipeIdList.join(','));
      }
    } catch (error) {
      console.error('Error refreshing recipes after deletion:', error);
    }
  };

  useEffect(() => {
    if (recipeIdList.length > 0) {
      recipe_detail(recipeIdList.join(','));
    }
  }, [recipeIdList]);

  if(loading){
  return(
  <div className={classes.recipe_container}>
      <Loader style={{color:'#ff5a5a'}} size={30}/>
  </div>
  );
  }else{

  return (
    <div className={classes.recipe_container}>
      <div className={classes.recipes_list}>
        <Grid container  style={{height:'inherit'}}> 
              {recipesList.map((recipe,index) => (
                <Grid xs={isMobile ? 12 : 3} style={{padding:'1rem'}}>
                  <LikedRecipe key={index} data={recipe} refreshFunction={refreshafterDeletion} />
                  {/* <MyRecipe userId={userId} key={recipe.id} recipeId={recipe.id} title={recipe.title} summary={recipe.summary} instructions={recipe.instructions} ingredients={recipe.ingredients} fetchRecipes={() => fetchRecipes()}/> */}
                </Grid>
              ))}
          </Grid>
     </div>
    </div>
  );
}
};

export default LikedRecipes;
