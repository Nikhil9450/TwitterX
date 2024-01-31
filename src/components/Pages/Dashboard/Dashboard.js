import React from 'react'
import Layout from "../../Header/Navigation/Layout";
import RecipeListContainer from './RecipeListContainer';
import MainContainer from './MainContainer';
const Dashboard = (props) => {
  return (
    <Layout>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <div style={{ flex: 1 }}>
          <RecipeListContainer />
        </div>
        <div style={{ flex: 2 }}>
          <MainContainer>
              {props.children}
          </MainContainer>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard