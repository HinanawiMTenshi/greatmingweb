import React , { useState }from 'react';
import './App.css';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Preferences from './components/Preferences';
import Login from './components/Login';
import Info from './components/Info';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();
  const [currentUser, setCurrentUser] = useState(sessionStorage.getItem('currentUser'));

  if(!token) {
    return <Login setToken={setToken} setCurrentUser={setCurrentUser}/>
  }
  //console.log(currentUser);
  return (
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
  );
}


export default App;