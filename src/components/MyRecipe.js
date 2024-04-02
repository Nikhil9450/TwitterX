import React from 'react'
import classes from './MyRecipe.module.css'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { useDispatch,useSelector } from 'react-redux';
import {viewRecipe} from '../slices/ViewRecipeSlice';
import Loader from './Loader';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransitionsModal from './Modal';
import DeleteIcon from '@mui/icons-material/Delete';
const MyRecipe = (props) => {
//   const dispatch = useDispatch()
    const [open,setOpen]=useState(false);
    const [loading, setLoading] = useState(false);
    const recipe_info = useSelector((state) => state.recipeInformation);
    const navigate = useNavigate();

    const handleOpen=()=>{
        setOpen(true);
    }
    const handleClose=()=>{
        setOpen(false);
    }

  return (
    <div className={classes.Recipe_card}>
        <div className={classes.description}>
            <div className={classes.delete_btn_container}><DeleteIcon style={{color:'#ff5a5a',cursor:'pointer'}} onClick={props.onDelete} /></div>
            <div>
                <img src='Images/noodles.png' alt="food_img" style={{height:'4rem'}} />
            </div>
            <p className={classes.title}>{props.title}</p>
            <button className={classes.view_btn} onClick={() => handleOpen(props.id)}>View</button>
        </div>
        <TransitionsModal  handleClose={handleClose} open={open} title={props.title} height={'100%'} width={'100%'}>
            <div className={classes.recipeinfo_maincontainer}>
            
                <div className={classes.recipeinfo}>
                    {/* <h4>{props.title}</h4> */}
                    <div className={classes.recipe_title + ' ' + classes.item}>
                        <p>{props.summary}</p>
                    </div>
                    <div className={classes.recipe_ingridient + ' ' + classes.item}>
                    <h3 className={classes.ing_title}>Ingrediends</h3>
                    <table className={classes.ing_table}>
                        {props.ingredients.map((ingredient, index) => (
                            <tr key={index}>
                                <td>{ingredient.ing_name}</td>
                                <td>{ingredient.ing_quantity} {ingredient.ing_unit}</td>
                            </tr>
                            ))}
                    </table>
                    </div>
                    <div className={classes.recipe_inf + ' ' + classes.item}>
                    <h5>HOW TO MAKE</h5>
                    <p>{props.instructions}</p>
                    </div>
                </div>

            </div>
        </TransitionsModal>
    </div>
  )
}

export default MyRecipe