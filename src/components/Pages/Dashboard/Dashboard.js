import React from 'react'
import Layout from "../../Header/Navigation/Layout";
import RecipeListContainer from './RecipeListContainer';
import classes from './Dashboard.module.css';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
const Dashboard = (props) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)}>
    <RecipeListContainer />
    </Box>
  );
  return (
    <Layout>
      <div style={{ display: 'flex' ,height: '100%'}}>
        <div className={classes.recipelist_container}>
          <RecipeListContainer />
        </div>
        <div className={classes.main_container}>
          <Button onClick={toggleDrawer(true)}>Open drawer</Button>
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