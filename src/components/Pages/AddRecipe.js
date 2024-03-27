import React from 'react'
import classes from './AddRecipe.module.css'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import Loader from '../Loader';
const AddRecipe = () => {
  const [loading, setLoading] = React.useState(false);

  const save_recipe=()=>{

  }
  return (
    <div className={classes.addRecipe_container}>

    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h4 style={{color:'grey'}}>ADD YOUR OWN RECIPE</h4>
        <div className={classes.titleAndInf}>
          <TextField id="filled-basic" label="ENTER TITLE" variant="filled" className={classes.recipe_title} style={{marginBottom:'10px'}}/>
          <TextField
                id="filled-multiline-static"
                label="ENTER RECIPE INFORMATION"
                multiline
                rows={6}
                defaultValue=""
                variant="filled"
              />  
        </div>
      </Grid>
      <Grid item xs={4}>
          <div className={classes.ingredient_cont}>
               <h5 style={{marginBottom:'10px',marginTop:'0px', color:'grey'}}>ADD INGREDIENTS</h5>
              <div className={classes.ingredient}>
                <TextField id="filled-basic" label="ENTER INGREDIENT NAME" variant="filled" className={classes.recipe_title} style={{padding:'0px 5px',marginBottom:'10px'}} fullWidth/>
                <TextField id="filled-basic" label="ENTER QUANTITY" type="number" variant="filled" className={classes.recipe_title} style={{padding:'0px 5px' ,marginBottom:'10px'}} fullWidth/>
                <TextField id="filled-basic" label="ENTER UNIT" variant="filled" className={classes.recipe_title} style={{padding:'0px 5px',marginBottom:'10px'}} fullWidth/>
              </div>
              <div className={classes.addBtn_container}>
                <Fab size="small"  style={{backgroundColor:"#fa9b27",color:"white"}} aria-label="add">
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
              />
       <div className={classes.saveBtn_container}>
        <Fab variant="extended"  style={{width: '100%',minWidth:'20rem',minHeight:'4rem', boxShadow:'none', borderRadius:'0px'}} onClick={save_recipe}>
          {(loading?<Loader size={30} />:'SAVE RECIPE')}
        </Fab>
       </div>
      </Grid>
    </Grid>
    </div>
  )
}

export default AddRecipe