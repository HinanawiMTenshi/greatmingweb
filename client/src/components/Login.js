import React, { useState } from 'react';
//import './components/Login.css';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function Login({ setToken  }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [currentUser, setCurrentUser] = useState(null);
    

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
          username,
          password
        });
        setToken(response);
        sessionStorage.setItem('currentUser', response.user.username);
        //console.log(response.user.username);
        //console.log(currentUser);
      }

    


    return(
      <div className="login-wrapper">
      <h1>Please Log In</h1>
      {currentUser ? <p>Logged in as: {currentUser}</p> : null}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    )
  }
  
  Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }