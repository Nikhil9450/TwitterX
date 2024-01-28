// import logo from './logo.svg';
import './App.css';
import { Route,Routes,Navigate } from 'react-router-dom';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import Login from './components/Pages/Login/Login';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect,useState } from "react";
import {auth} from "./firebase";
// import Layout from './components/Header/Navigation/Layout';


function App() {
  const[authUser,setAuthUser]=useState(null);
  useEffect(()=>{
      const listen = onAuthStateChanged(auth,(user)=>{
          if(user){
              setAuthUser(user)
          }else{
              setAuthUser(null);
          }
      })
  },[]);

  return (
    // <Layout>
      <Routes>
        {authUser?<Route path='/' element={<Dashboard/>} />:<Route path='/' element={<Login/>} />}        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    // </Layout>
  );
}

export default App;
