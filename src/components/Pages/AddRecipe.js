import React from 'react'
import classes from './AddRecipe.module.css'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Loader from '../Loader';
import { useState ,useRef} from 'react';
import {auth} from "../../../src/firebase";
import { useSelector } from 'react-redux';
import { getFirestore, collection,addDoc } from 'firebase/firestore';
import CustomizedSnackbars from '../Snackbar';
const AddRecipe = () => {
  const [loading, setLoading] =useState(false);
  const [ingredient,setIngredient]=useState([]);
  // const [recipeData,setrecipeData]=useState({});
  const titleRef=useRef("");
  const summaryRef=useRef("");
  const stepsRef=useRef("");
  const ing_NameRef=useRef("")
  const ing_quantityRef=useRef("")
  const ing_unitRef=useRef("")
  const [open, setOpen] = useState(false);
  const [message, setMessage]=useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const user = auth.currentUser;

  const save_recipe = async () => {
    if (!user) {
      console.error('User is not authenticated');
      return;
    }
    if (titleRef.current.value==""){
      handleClick();
      setMessage("Please enter the recipe title !")
    }
    else if(summaryRef.current.vlaue==""){
      handleClick();
      setMessage("Please enter about the recipe !")
    }
    else if(stepsRef.current.value==""){
      handleClick();
      setMessage("Please enter instruction of recipe !")
    }
    else if(ingredient.length==0){
      handleClick();
      setMessage("Please enter the ingredients!")
    }
    else{
    // Gather recipe data
    const newRecipeData = {
      title: titleRef.current.value,
      summary: summaryRef.current.value,
      instructions: stepsRef.current.value,
      ingredients: ingredient,
    };

    // Update local state
    // setrecipeData(newRecipeData);

    // Store recipeData in Firestore
    try {
      const db = getFirestore();
      const recipesCollectionRef = collection(db, 'users', user.uid, 'recipes');
      await addDoc(recipesCollectionRef, newRecipeData);
      console.log('Recipe data stored in Firestore successfully!');
    } catch (error) {
      console.error('Error storing recipe data in Firestore:', error);
    }
  }
  };

  const add_ingrediets=()=>{
    const newIngredient = {
      ing_name: ing_NameRef.current.value,
      ing_quantity: ing_quantityRef.current.value,
      ing_unit: ing_unitRef.current.value,
    };
    setIngredient(prevState => [...prevState, newIngredient]);
    // Clear input fields after adding ingredient
    ing_NameRef.current.value = '';
    ing_quantityRef.current.value = '';
    ing_unitRef.current.value = '';
  };
  return (
    <div className={classes.addRecipe_container}>
      <div className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h4 style={{color:'grey'}}>ADD YOUR OWN RECIPE</h4>
            <div className={classes.titleAndInf}>
              <TextField id="filled-basic" label="ENTER TITLE" variant="filled" className={classes.recipe_title} style={{marginBottom:'10px'}} inputRef={titleRef}/>
              <TextField
                    id="filled-multiline-static"
                    label="ENTER RECIPE INFORMATION"
                    multiline
                    rows={6}
                    defaultValue=""
                    variant="filled"
                    inputRef={summaryRef}
                  />  
            </div>
          </Grid>
          <Grid item xs={4}>
              <div className={classes.ingredient_cont}>
                  <h5 style={{marginBottom:'10px',marginTop:'0px', color:'grey'}}>ADD INGREDIENTS</h5>
                  <div className={classes.ingredient}>
                    <TextField id="filled-basic" label="ENTER INGREDIENT NAME" variant="filled" className={classes.recipe_title} style={{padding:'0px 5px',marginBottom:'10px'}} inputRef={ing_NameRef} fullWidth/>
                    <TextField id="filled-basic" label="ENTER QUANTITY" type="number" variant="filled" className={classes.recipe_title} style={{padding:'0px 5px' ,marginBottom:'10px'}} inputRef={ing_quantityRef} fullWidth/>
                    <TextField id="filled-basic" label="ENTER UNIT" variant="filled" className={classes.recipe_title} style={{padding:'0px 5px',marginBottom:'10px'}} inputRef={ing_unitRef} fullWidth/>
                  </div>
                  <div className={classes.addBtn_container}>
                    <Fab size="small"  style={{backgroundColor:"#fa9b27",color:"white"}} aria-label="add" onClick={add_ingrediets}>
                      <AddIcon />
                    </Fab>
                  </div>
                </div>
          </Grid>
          <Grid item xs={8}>
            {/* <Item> */}
            <TextField
                    id="filled-multiline-static"
                    label="ADD STEPS TO MAKE"
                    multiline
                    rows={9}
                    defaultValue=""
                    variant="filled"
                    fullWidth
                    inputRef={stepsRef}
                  />
          <div className={classes.saveBtn_container}>
            <Fab variant="extended"  style={{width: '100%',minWidth:'20rem',minHeight:'4rem', boxShadow:'none', borderRadius:'0px'}} onClick={save_recipe}>
              {(loading?<Loader size={30} />:'SAVE RECIPE')}
            </Fab>
          </div>
          </Grid>
        </Grid>
      </div>
      <CustomizedSnackbars open={open} handleClick={handleClick} handleClose={handleClose} message={message}/>
    </div>
  )
}

export default AddRecipe