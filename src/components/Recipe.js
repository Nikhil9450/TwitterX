import React from 'react'
import classes from './Recipe.module.css'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { useDispatch,useSelector } from 'react-redux';
import {viewRecipe} from '../slices/ViewRecipeSlice';
import Loader from './Loader';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {setDrawer} from '../slices/RecipeDrawerSlice';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { likeRecipe,unlikeRecipe } from '../slices/LikedRecipeListSlice';
import { getFirestore, doc, updateDoc,getDoc,getDocs,query,collection } from 'firebase/firestore';
import {auth} from "../firebase";
// import { getFirestore, collection,addDoc } from 'firebase/firestore';
// import {auth} from "../../src/firebase";


const Recipe = (props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const recipe_info = useSelector((state) => state.recipeInformation);
  const [liked_recipe_list,Setliked_recipe_list]= useState("");
  const navigate = useNavigate();
  const db = getFirestore(); // Get Firestore instance
  const user = auth.currentUser;
  const userId = user ? user.uid : '';

  // const user = auth.currentUser;

//  const sendLikedToDb =async()=>{
//   setLoading(true);
//   try {
//     const db = getFirestore();
//     const likedRecipesRef = collection(db, 'users', user.uid, 'Liked_recipes');
//     await addDoc(likedRecipesRef, liked_recipe_list);
//     console.log('Liked Recipe stored in Firestore successfully!');
//     setLoading(false);
//   } catch (error) {
//     console.error('Error storing Liked Recipe data in Firestore:', error);
//     setLoading(false);
//   }
//  }
// useEffect(()=>{
//   sendLikedToDb();
// },[liked_recipe_list])


 function recipe_detail(id){
  setLoading(true);
   console.log("id------>",id,);
   dispatch(viewRecipe({ apiKey: "bcffb3f9bbd6414aaf1fa753f147235f", id: id,includeNutrition:true  }))
   .then(()=>{
      setLoading(false);
      navigate('/');
      dispatch(setDrawer(false));
   })
   console.log("recipe_info--------->",recipe_info);
 }

 async function deleteIdFromFirestore(id) {
  try {
    const likedRecipesRef = doc(db, 'users', user.uid, 'Liked_recipes', 'documentId'); // Replace 'documentId' with actual document ID
    const docSnapshot = await getDoc(likedRecipesRef);
    if (docSnapshot.exists()) {
      const existingData = docSnapshot.data();
      const updatedRecipeIds = existingData.recipeIds.filter(recipeId => recipeId !== id);
      await updateDoc(likedRecipesRef, { recipeIds: updatedRecipeIds });
      console.log(`Deleted ID ${id} from Firestore`);
    }
  } catch (error) {
    console.error('Error deleting ID from Firestore:', error);
  }
}

async function addIdToFirestore(id) {
  try {
    const likedRecipesRef = doc(db, 'users', user.uid, 'Liked_recipes', 'documentId'); // Replace 'documentId' with actual document ID
    const docSnapshot = await getDoc(likedRecipesRef);
    if (docSnapshot.exists()) {
      const existingData = docSnapshot.data();
      const updatedRecipeIds = [...existingData.recipeIds, id];
      await updateDoc(likedRecipesRef, { recipeIds: updatedRecipeIds });
      console.log(`Added ID ${id} to Firestore`);
    }
  } catch (error) {
    console.error('Error adding ID to Firestore:', error);
  }
}

const fetchLikedList = async () => {
  try {
    const db = getFirestore();
    const recipesRef = collection(db, 'users', userId, 'Liked_recipes');
    const q = query(recipesRef);

    const querySnapshot = await getDocs(q);
    const recipesListData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    Setliked_recipe_list(recipesListData[0].recipeIds)
    // dispatch(updateList(recipesListData[0].recipeIds ));

    console.log("likedList from firestore----------->", recipesListData[0].recipeIds);
    // setRecipes(recipesData);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
};

async function addToLikedArray(event){
  
  if (event.target.checked) {
    // dispatch(likeRecipe(props.id));
    await addIdToFirestore(props.id)
    fetchLikedList();
  } else {
    // dispatch(unlikeRecipe(props.id));
    await deleteIdFromFirestore(props.id)
    fetchLikedList();
  }
 }

 useEffect(()=>{
  fetchLikedList();
 },[])
  return (
    <div className={classes.Recipe_card}>
      <div className={classes.img_container}>
        <img className={classes.img} src={props.image} alt="recipe_image" />
      </div>
        <div className={classes.description}>
            <p className={classes.title}>{props.title}</p>
            <div className={classes.checkbox_container}>
              <Checkbox  icon={<FavoriteBorder style={{ color:'#b1b1b1'}}/>} onChange={addToLikedArray} checkedIcon={<Favorite style={{ color:'#d45311'}}/>} checked={liked_recipe_list.includes(props.id)}/>
              <button className={classes.view_btn} onClick={() => recipe_detail(props.id)}>{(loading?<Loader size={20} />:<KeyboardArrowRightRoundedIcon style={{ color: 'grey'}}/>)}</button>
            </div>
        </div>
    </div>
  )
}

export default Recipe