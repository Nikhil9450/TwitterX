import React from 'react'
import classes from './RecipeListContainer.module.css';
import Recipe from '../../Recipe';
import { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchRecipe } from '../../../slices/SearchRecipeSlice';
import { getFirestore,getDoc,setDoc,doc } from 'firebase/firestore';
import {auth} from "../../../firebase";
// import SearchIcon from '@mui/icons-material/Search';
// import Loader from '../../Loader';
import BasicPagination from '../../pagination';
const RecipeListContainer = (props) => {
  const dispatch = useDispatch();
  const recipeList = useSelector((state) => state.recipeList.data.results);
  const selected_filters = useSelector((state) => state.dropDownlist);
  const totalResults = useSelector((state) => state.recipeList.data.totalResults);
  const perPage = 10; 
  const [currentPage, setCurrentPage] = useState(1);
  const searchedValue = useSelector((state) => state.SearchItem.Searched_item);
  const liked_recipe_list= useSelector((state)=>state.Favourates.likedList);
  // const [loading, setLoading] = useState(false);
  const user = auth.currentUser;


const sendLikedToDb = async () => {
  try {
    const db = getFirestore();
    const likedRecipesRef = doc(db, 'users', user.uid, 'Liked_recipes', 'documentId'); // Replace 'documentId' with the ID of the document
    
    // Remove duplicates from liked_recipe_list using Set
    const uniqueLikedRecipes = [...new Set(liked_recipe_list)];

    const docSnapshot = await getDoc(likedRecipesRef);
    if (docSnapshot.exists()) {
      const existingData = docSnapshot.data();
      const existingRecipeIds = existingData.recipeIds || []; // Handle the case where recipeIds may be undefined
      const mergedRecipeIds = [...new Set([...existingRecipeIds, ...uniqueLikedRecipes])];

      await setDoc(likedRecipesRef, { recipeIds: mergedRecipeIds });
      console.log('Liked Recipe data updated in Firestore successfully!');
    } else {
      await setDoc(likedRecipesRef, { recipeIds: uniqueLikedRecipes });
      console.log('Liked Recipe initialized in Firestore successfully!');
    }
  } catch (error) {
    console.error('Error storing Liked Recipe data in Firestore:', error);
  }
};
  useEffect(()=>{
    sendLikedToDb();
  },[])

  useEffect(() => {
    console.log("totalResults---------------->",totalResults)
    console.log("perPage---------------->",perPage)
    console.log("liked_recipe_list-------------->",liked_recipe_list);
    // fetchData(currentPage);

    if (currentPage !== 1) {
      fetchData(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    console.log("liked_recipe_list------->",liked_recipe_list);
   }, [liked_recipe_list]); 

   const fetchData = (page) => {
    dispatch(
      fetchRecipe({
        apiKey: "bcffb3f9bbd6414aaf1fa753f147235f",
        number: 10,
        diet: selected_filters.filters.diet,
        cuisine: selected_filters.filters.cuisines,
        type: selected_filters.filters.type,
        query: searchedValue,
        maxProtein: selected_filters.filters.maxProtein,
        minProtein: selected_filters.filters.minProtein,
        minCarbs: selected_filters.filters.minCarbs,
        maxCarbs: selected_filters.filters.maxCarbs,
        minFat: selected_filters.filters.minFat,
        maxFat: selected_filters.filters.maxFat,
        minFiber: selected_filters.filters.minFiber,
        maxFiber: selected_filters.filters.maxFiber,
        minIron: selected_filters.filters.minIron,
        maxIron: selected_filters.filters.maxIron,
        minSugar: selected_filters.filters.minSugar,
        maxSugar: selected_filters.filters.maxSugar,
        offset: (page - 1) * 10,
      })
    )
  };
  
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    console.log('selected_filters updated:', selected_filters);
  };
  
  if(recipeList.length==0){
    return (
      <div className={classes.main_empty}>
         <p style={{color:'white'}}>Search for the recipes.</p>
      </div>
    )
  }else{
    return (
      <div className={classes.main}>

        {recipeList && recipeList.map((element, index) => (
          <Recipe key={index} title={element.title} image={element.image} id={element.id}  />
        ))}

        <BasicPagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalResults={totalResults}
          perPage={perPage}
        />
  
      </div>
    )
  }
}

export default RecipeListContainer