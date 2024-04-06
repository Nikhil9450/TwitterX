import React from 'react'
import classes from './MyRecipe.module.css'
// import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
// import { useDispatch,useSelector } from 'react-redux';
// import {viewRecipe} from '../slices/ViewRecipeSlice';
import Loader from './Loader';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import TransitionsModal from './Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFirestore, deleteDoc, doc } from 'firebase/firestore';
// import Divider from '@mui/material/Divider';

const MyRecipe = (props) => {
//   const dispatch = useDispatch()
    const [open,setOpen]=useState(false);
    const [loading, setLoading] = useState(false);
    const id=props.key;
    // const recipe_info = useSelector((state) => state.recipeInformation);
    // const navigate = useNavigate();

    const handleOpen=()=>{
        setOpen(true);
    }
    const handleClose=()=>{
        setOpen(false);
    }
    const handleDeleteRecipe = async (recipeId) => {
        setLoading(true);
        try {
          const db = getFirestore();
          const recipeDoc = doc(db, 'users', props.userId, 'recipes', recipeId);
          await deleteDoc(recipeDoc);
          setLoading(false);
          // After deletion, fetch and update the recipes list
          props.fetchRecipes();
        } catch (error) {
          setLoading(false);
          console.error('Error deleting recipe:', error);
        }
      };

  return (
    <div className={classes.card_container}>

        <div className={classes.Recipe_card}>
            <div className={classes.description}>
                <div className={classes.delete_btn_container}>
                    {(loading?<Loader style={{color:'#ff5a5a'}} size={30} />:<DeleteIcon style={{color:'#ff5a5a',cursor:'pointer'}} onClick={()=>handleDeleteRecipe(props.recipeId)} />)}
                </div>
                <img className={classes.food_img} src='Images/noodles.png' alt="food_img"  />
                <p className={classes.title}>{props.title}</p>
                <button className={classes.view_btn} onClick={() => handleOpen(props.id)}>View</button>
            </div>


        </div>
        <button className={classes.Mobile_Recipe_card} onClick={() => handleOpen(props.id)}>
            <div className={classes.title_container}>
                <img className={classes.food_img} src='Images/noodles.png' alt="food_img"  />
                <p className={classes.mobile_title}>{props.title}</p>
            </div>
            {(loading?<Loader style={{color:'#ff5a5a'}} size={30} />:<DeleteIcon style={{color:'#ff5a5a',cursor:'pointer'}} onClick={()=>handleDeleteRecipe(props.recipeId)} />)}


        </button>
        <TransitionsModal  handleClose={handleClose} open={open} title={props.title} height={'100%'} width={'100%'}>
                <div className={classes.recipeinfo_maincontainer}>
                    <div className={classes.recipeinfo}>
                        <div className={classes.container}>
                            <div className={classes.summary_container}>
                                <div className={classes.recipe_title + ' ' + classes.item}>
                                    <h5>SUMMARY</h5>
                                    <p>{props.summary}</p>
                                </div>
                            </div>
                            <div className={classes.recipe_inf_ingridient_container}>
                                <div className={classes.recipe_ingridient + ' ' + classes.item}>
                                    <h3 className={classes.ing_title}>Ingrediends</h3>
                                    <table className={classes.ing_table}>
                                        {props.ingredients.map((ingredient, index) => (
                                            <tr key={index}>
                                                <td>{ingredient.ing_name}</td>
                                                <td>{ingredient.ing_quantity} {ingredient.ing_unit}</td>
                                            </tr>
                                            ))
                                        }
                                    </table>
                                </div>
                                <div className={classes.recipe_inf + ' ' + classes.item}>
                                    <h5>HOW TO MAKE</h5>
                                    <p>{props.instructions}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </TransitionsModal>
    </div>
  )
}

export default MyRecipe