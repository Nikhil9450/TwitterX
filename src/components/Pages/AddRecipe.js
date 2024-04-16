import React from 'react'
import classes from './AddRecipe.module.css'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Loader from '../Loader';
import { useState ,useRef} from 'react';
import {auth} from "../../../src/firebase";
// import { useSelector } from 'react-redux';
import { getFirestore, collection,addDoc } from 'firebase/firestore';
import CustomizedSnackbars from '../Snackbar';
import TransitionsModal from '../Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useMediaQuery } from '@mui/material';
import Swal from 'sweetalert2';

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
  const [snacbarOpen,setSnackbarOpen]=useState(false)
  const [message, setMessage]=useState("");
  const isMobile = useMediaQuery('(max-width:700px)');

  const handleClick = () => {
    setSnackbarOpen(true);
  };

  const handlesnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const user = auth.currentUser;

  const save_recipe = async () => {
    console.log("instructions------------>",summaryRef.current.value)
    if (!user) {
      console.error('User is not authenticated');
      return;
    }
    if (titleRef.current.value === ""){
      handleClick();
      setMessage("Please enter the recipe title !")
    }
    else if(summaryRef.current.value === ""){
      handleClick();
      setMessage("Please enter about the recipe !");
    }
    else if(stepsRef.current.value===""){
      handleClick();
      setMessage("Please enter instruction of recipe !")
    }
    else if(ingredient.length===0){
      handleClick();
      setMessage("Please enter the ingredients !")
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
    setLoading(true);
    try {
      const db = getFirestore();
      const recipesCollectionRef = collection(db, 'users', user.uid, 'recipes');
      await addDoc(recipesCollectionRef, newRecipeData);
      console.log('Recipe data stored in Firestore successfully!');
      titleRef.current.value='';
      summaryRef.current.value='';
      stepsRef.current.value='';
      ing_NameRef.current.value='';
      ing_quantityRef.current.value='';
      ing_unitRef.current.value='';
      Swal.fire({
        title: "Added",
        text: "Recipe added successfully.",
        icon: "success"
      });
      setLoading(false);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: {error},
        icon: "error",
      });
      console.error('Error storing recipe data in Firestore:', error);
      setLoading(false);
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

  const handleOpen=()=>{
    setOpen(true);
}
const handleClose=()=>{
    setOpen(false);
}
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
          <Grid item xs={isMobile ? 12 : 4}>
              <div className={classes.ingredient_cont}>
                  <h5 style={{marginBottom:'10px',marginTop:'0px', color:'grey'}}>ADD INGREDIENTS</h5>
                  <div className={classes.ingredient}>
                    <TextField id="filled-basic" label="ENTER INGREDIENT NAME" variant="filled" className={classes.recipe_title} style={{padding:'0px 5px',marginBottom:'10px'}} inputRef={ing_NameRef} fullWidth/>
                    <TextField id="filled-basic" label="ENTER QUANTITY" type="number" variant="filled" className={classes.recipe_title} style={{padding:'0px 5px' ,marginBottom:'10px'}} inputRef={ing_quantityRef} fullWidth/>
                    <TextField id="filled-basic" label="ENTER UNIT" variant="filled" className={classes.recipe_title} style={{padding:'0px 5px',marginBottom:'10px'}} inputRef={ing_unitRef} fullWidth/>
                  </div>
                  <div className={classes.addBtn_container}>
                  <Fab size="small"  style={{backgroundColor:"#e84f09",color:"white", margin:"0rem 1rem"}} aria-label="add" onClick={handleOpen}>
                      <VisibilityIcon />
                    </Fab>
                    <Fab size="small"  style={{backgroundColor:"#e84f09",color:"white"}} aria-label="add" onClick={add_ingrediets}>
                      <AddIcon />
                    </Fab>
                  </div>
                </div>
          </Grid>
          <Grid item xs={isMobile ? 12 : 8}>
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
            <Fab variant="extended"  style={{width: '100%',minWidth:'20rem',minHeight:'4rem', boxShadow:'none', borderRadius:'0px', background:"#e84f09",color:'white'}} onClick={save_recipe}>
              {(loading?<Loader size={30} />:'SAVE RECIPE')}
            </Fab>
          </div>
          </Grid>
        </Grid>
      </div>
      <CustomizedSnackbars open={snacbarOpen} handleClick={handleClick} handleClose={handlesnackbarClose} message={message}/>
      <TransitionsModal  handleClose={handleClose} open={open} title={'Ingrediends'} height={'50%'} width={'50%'}>
        <div className={classes.recipe_ingridient + ' ' + classes.item}>
            {/* <h3 className={classes.ing_title}>Ingrediends</h3> */}
            <table className={classes.ing_table}>
                {ingredient.map((ingredient, index) => (
                    <tr key={index}>
                        <td>{ingredient.ing_name}</td>
                        <td>{ingredient.ing_quantity} {ingredient.ing_unit}</td>
                    </tr>
                    ))}
            </table>
          </div>
        </TransitionsModal>
    </div>
  )
}

export default AddRecipe