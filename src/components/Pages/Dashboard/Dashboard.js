import React, { useEffect } from 'react'
import Layout from "../../Header/Navigation/Layout";
import RecipeListContainer from './RecipeListContainer';
import classes from './Dashboard.module.css';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch,useSelector} from 'react-redux';
import {setDrawer} from '../../../slices/RecipeDrawerSlice';
import { useMediaQuery } from '@mui/material';
// import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
// import {auth} from "../../../firebase";
// import { updateList } from '../../../slices/LikedRecipeListSlice';

const Dashboard = (props) => {
  // const [open, setOpen] = React.useState(false);
  const dispatch= useDispatch();
  const drawer=useSelector((state)=>state.Drawer.open);
  const isMobile = useMediaQuery('(max-width:1000px)');

  console.log("drawer--------------->",drawer);
  // const user = auth.currentUser;
  // const userId = user ? user.uid : '';
  // dispatch(setDrawer(true));

  // const fetchLikedList = async () => {
  //   try {
  //     const db = getFirestore();
  //     const recipesRef = collection(db, 'users', userId, 'Liked_recipes');
  //     const q = query(recipesRef);

  //     const querySnapshot = await getDocs(q);
  //     const recipesListData = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     dispatch(updateList(recipesListData[0].recipeIds ));

  //     console.log("likedList from firestore----------->", recipesListData[0].recipeIds);
  //     // setRecipes(recipesData);
  //   } catch (error) {
  //     console.error('Error fetching recipes:', error);
  //   }
  // };
  
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    dispatch(setDrawer(open));
  };
   
  // useEffect(()=>{
  //   fetchLikedList();
  // },[])
  const DrawerList = (
    <Box sx={{ width: 300, background: 'black'}} role="presentation" >
      <div style={{height:'100%'}}>
        <div className={classes.recipelist_heading}>
          <p>LIST OF RECIPES</p> 
          <CloseIcon onClick={toggleDrawer(false)}  style={{cursor:'pointer',color:'white'}}/>
        </div>
        <RecipeListContainer />
      </div>
    </Box>
  );
  return (
    <Layout>
      <div style={{ display: 'flex' ,height: '100%'}}>
        <div className={classes.recipelist_container}>
          <RecipeListContainer/>
        </div>
        <div className={classes.main_container}>
          {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
          <Drawer sx={{ display: isMobile ? 'block' : 'none' }} open={drawer} onClose={toggleDrawer(false)} >
            {DrawerList}
          </Drawer>
              {props.children}
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard