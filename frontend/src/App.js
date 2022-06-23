import React, {useState, useMemo, useContext} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {Home} from './pages/Home';
import {Details} from './pages/DetailsRecipie';
import {AddRecipie} from './pages/AddRecipie';
import {EditRecipie} from './pages/EditRecipie';
import {Login} from './pages/Login';
import {Logout} from './pages/Logout';
import {Register} from './pages/Register';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import './App.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from './UserContext';
import PrivateRoute from './PrivateRoute';
import PrivateRouteAuth from './PrivateRouteAuth';

function App() {

  // const [userInfo, setUserInfo] = useState(null);
  // const value = useMemo(() => ({ userInfo, setUserInfo }), [userInfo, setUserInfo]);


  const [userInfo, setUserInfo] = useState('');

  return (
    <BrowserRouter>
    <div className='App'>
    <Helmet>
    <title>Home</title>
    
    </Helmet>
    <UserContext.Provider value={{userInfo, setUserInfo}}>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/details/:id" element={<Details />}></Route>
      <Route path="/" element={<PrivateRoute></PrivateRoute>}>
        <Route path="/recipie/edit/:id" element={<EditRecipie />}></Route>
      </Route>
      <Route path="/" element={<PrivateRouteAuth></PrivateRouteAuth>}>
        <Route path="/recipie/add" element={<AddRecipie />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Route>
    </Routes>
    </UserContext.Provider>
    <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
