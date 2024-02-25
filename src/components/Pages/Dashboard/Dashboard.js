import React from 'react'
import Layout from "../../Header/Navigation/Layout";
import RecipeListContainer from './RecipeListContainer';
import MainContainer from './MainContainer';
const Dashboard = (props) => {
  return (
    <Layout>
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ flex: 1,height:'inherit' }}>
          <RecipeListContainer />
        </div>
        <div style={{ flex: 2, height:'inherit'}}>
          <MainContainer>
              {props.children}
          </MainContainer>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard