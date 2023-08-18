import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/homepage';
import Info from './pages/info';
import Development from "./pages/development";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div>
        {/*<nav>*/}
        {/*  <ul>*/}
        {/*    /!*<li><Link to="/">Home</Link></li>*!/*/}
        {/*    /!*<li><Link to="/info">Info</Link></li>*!/*/}
        {/*  </ul>*/}
        {/*</nav>*/}
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/info" element={<Info />} />
            <Route path="/development" element={<Development />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
