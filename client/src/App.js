import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Preferences from './components/Preferences';
import Login from "./pages/Login";
import Info from './components/Info';
import useToken from './useToken';
import { CartProvider } from "./contexts/CartContext";
import Product from "./components/Product";
import Cart from "./components/Cart";

function App() {
  const { token, setToken } = useToken();
  const [currentUser, setCurrentUser] = useState(sessionStorage.getItem('currentUser'));
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  if(!token) {
    return <Login setToken={setToken} setCurrentUser={setCurrentUser}/>
  }
  //console.log(currentUser);
  return (

    
    <CartProvider>
      <div className="App">
        {products.map(product => (
          <Product key={product.id} {...product} />
        ))}
        <Cart />
      </div>
      <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Preferences" element={<Preferences />} />
          <Route path="/Info" element={<Info currentUser={currentUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
    </CartProvider>
  );
}


export default App;