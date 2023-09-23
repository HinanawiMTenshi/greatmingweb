import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Preferences from './components/Preferences';
import Login from "./pages/Login";
import Info from './pages/info';
import useToken from './useToken';
import Homepage from "./pages/homepage";
import Development from "./pages/development";
import Register from "./pages/register";
import RegisterTourists from "./pages/registerTourists";
import Admin from "./pages/admin";
import { CartProvider } from "./contexts/CartContext";
import Product from "./components/Product";
import Cart from "./components/Cart";


function App() {
  const { token, setToken } = useToken();
  const [currentUser, setCurrentUser] = useState(sessionStorage.getItem('currentUser'));
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   // Fetch products from backend
  //   fetch("http://localhost:3000/products")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  // }, []);

  return (
      <div className="App">
          <div className="wrapper">
              {/*<h1>Application</h1>*/}
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<Homepage currentUser={currentUser} />} />
                      <Route path="/Development" element={<Development />} />
                      <Route path="/Login" element={<Login setToken={setToken} setCurrentUser={setCurrentUser} />} />
                      {/*<Route path="/Register" element={<Register setToken={setToken}/>} />*/}
                      <Route path="/RegisterTourists" element={<RegisterTourists />} />

                      {/* 登录用户的受保护路由 */}
                      {token && (
                          <>
                              <Route path="/Dashboard" element={<Dashboard />} />
                              <Route path="/Preferences" element={<Preferences />} />
                              <Route path="/Info" element={<Info currentUser={currentUser} />} />
                              <Route path="/Admin" element={<Admin currentUser={currentUser}/>} />
                              <Route path="/Register" element={<Register />} />
                              {/*<Route path="/Register" element={<Register />} />*/}
                          </>
                      )}

                      {/* 未登录用户显示登录页 */}
                      {!token && (
                          <Route path="/Login" element={<Login setToken={setToken} setCurrentUser={setCurrentUser} />} />
                      )}
                  </Routes>
              </BrowserRouter>
          </div>
      </div>
  );
}


export default App;