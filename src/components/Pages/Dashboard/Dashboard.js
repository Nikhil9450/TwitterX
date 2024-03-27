import React from 'react'
import Layout from "../../Header/Navigation/Layout";
import RecipeListContainer from './RecipeListContainer';
import classes from './Dashboard.module.css';
const Dashboard = (props) => {
  return (
    <Layout>
      <div style={{ display: 'flex' ,height: '100%'}}>
        <div className={classes.recipelist_container} style={{ flex: 1,height:'100%', overflowY:'auto' }}>
          <RecipeListContainer />
        </div>
        <div className={classes.main_container} style={{ flex: 3, height:'100%', overflowY:'auto'}}>
              {props.children}
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard