// import logo from './logo.svg';
import './App.css';
import { Route,Routes,Navigate } from 'react-router-dom';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import Login from './components/Pages/Login/Login';
// import Layout from './components/Header/Navigation/Layout';


function App() {
  return (
    // <Layout>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    // </Layout>
  );
}

export default App;
