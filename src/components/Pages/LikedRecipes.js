

// import React, { useEffect, useState } from 'react';
// import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
// import { auth } from "../../../src/firebase";
// import classes from './LikedRecipes.module.css';
// import axios from 'axios';

// const LikedRecipes = () => {
//   // const [loading, setLoading] = useState(true);
//   const [recipeidList, setRecipeIdList] = useState([]);
//   const user = auth.currentUser;
//   const userId = user ? user.uid : '';

//   const fetchList = async () => {
//     try {
//       const db = getFirestore();
//       const recipesRef = collection(db, 'users', userId, 'Liked_recipes');
//       const q = query(recipesRef);
  
//       const querySnapshot = await getDocs(q);
//       const recipesListData = querySnapshot.docs.map(doc => doc.data());
//       setRecipeIdList(recipesListData[0].recipeIds);
//       console.log("recipesListData[0].recipeIds-------->",recipesListData[0].recipeIds);

//     } catch (error) {
//       console.error('Error fetching liked recipes:', error);
//     }
//   };

//   async function getdata() {
//     try {
//       await fetchList();
//       console.log("recipeidList in getdata---------->", recipeidList);
//     } catch (error) {
//       console.error('Error in getdata:', error);
//     }
//   }

//   const recipe_detail = async ids => {
//     try {
//       const response = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=bcffb3f9bbd6414aaf1fa753f147235f`);
//       console.log("API Response:", response.data);
//       // Process response data as needed
//       setLoading(false);
      
//     } catch (error) {
//       console.error("Error fetching recipe details:", error);
//     }
//   };
  
//   useEffect(() => {
//     console.log("recipeidList updated:", recipeidList);
//   }, [recipeidList]);
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       await fetchLikedList();
//   //       console.log("Fetched Recipe IDs:", recipeidList);
//   //     } catch (error) {
//   //       console.error("Error fetching liked recipes:", error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [userId]);
//   // useEffect(() => {
//   //   if (userId) {
//   //     fetchLikedList();
//   //   }
//   // }, [userId]);

//   // useEffect(() => {
//   //   if (recipeidList.length > 0) {
//   //     recipe_detail(recipeidList);
//   //   }
//   // }, [recipeidList]);

//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }

//   return (
//     <div className={classes.recipe_container}>
//       <button onClick={()=>{getdata()}}>Fetch Liked Recipes</button>
//       {/* Render your component content here */}
//     </div>
//   );
// };

// export default LikedRecipes;



import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { auth } from "../../../src/firebase";
import classes from './LikedRecipes.module.css';
import axios from 'axios';

const LikedRecipes = () => {
  const [recipeIdList, setRecipeIdList] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;
  const userId = user ? user.uid : '';

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
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=bcffb3f9bbd6414aaf1fa753f147235f`);
      console.log("API Response:", response.data);
      setLoading(false);
      
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  useEffect(() => {
    if (recipeIdList.length > 0) {
      recipe_detail(recipeIdList.join(','));
    }
  }, [recipeIdList]); // Run whenever recipeIdList changes

  return (
    <div className={classes.recipe_container}>
      <button onClick={fetchList}>Fetch Liked Recipes</button>
      {/* Render your component content here */}
    </div>
  );
};

export default LikedRecipes;
