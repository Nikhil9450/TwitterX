import React from 'react'
import Layout from "../../Header/Navigation/Layout";
import RecipeListContainer from './RecipeListContainer';
import classes from './Dashboard.module.css';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch,useSelector} from 'react-redux';
import {setDrawer} from '../../../slices/RecipeDrawerSlice';

const Dashboard = (props) => {
  // const [open, setOpen] = React.useState(false);
  const dispatch= useDispatch();
  const drawer=useSelector((state)=>state.Drawer.open);
  console.log("drawer--------------->",drawer);
  // dispatch(setDrawer(true));
  
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    dispatch(setDrawer(open));
  };

  const DrawerList = (
    <Box sx={{ width: 300, background:'black' }} role="presentation" >
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
          <Drawer open={drawer} onClose={toggleDrawer(false)} >
            {DrawerList}
          </Drawer>
              {props.children}
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard