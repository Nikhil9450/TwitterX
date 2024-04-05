import React from 'react'
import Layout from "../../Header/Navigation/Layout";
import RecipeListContainer from './RecipeListContainer';
import classes from './Dashboard.module.css';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

const Dashboard = (props) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 300, background:'black' }} role="presentation" onClick={toggleDrawer(false)}>
      <div style={{height:'100%'}}>
        <div className={classes.recipelist_heading}>
          <p>LIST OF RECIPES</p> 
          <CloseIcon onClick={()=>{setOpen(false);}}  style={{cursor:'pointer',color:'white'}}/>
        </div>
        <RecipeListContainer />
      </div>
    </Box>
  );
  return (
    <Layout toggleDrawer={toggleDrawer}>
      <div style={{ display: 'flex' ,height: '100%'}}>
        <div className={classes.recipelist_container}>
          <RecipeListContainer />
        </div>
        <div className={classes.main_container}>
          {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
          <Drawer open={open} onClose={toggleDrawer(false)} >
            {DrawerList}
          </Drawer>
              {props.children}
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard