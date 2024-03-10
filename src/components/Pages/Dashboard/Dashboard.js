import React from 'react'
import Layout from "../../Header/Navigation/Layout";
import RecipeListContainer from './RecipeListContainer';
const Dashboard = (props) => {
  return (
    <Layout>
      <div style={{ display: 'flex', height: '88vh' }}>
        <div style={{ flex: 1,height:'inherit' }}>
          <RecipeListContainer />
        </div>
        <div style={{ flex: 2, height:'inherit'}}>
              {props.children}
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard