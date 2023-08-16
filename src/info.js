import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Info() {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(1); // Example id

  useEffect(() => {
    axios.get(`http://localhost:3000/user/${userId}`)
      .then(response => {
        setUser(response.data[0]); // Assuming data is an array with one user
      })
      .catch(error => {
        console.log(error);
      });
  }, [userId]);

  // The JSX will render the user details and you can add functionality for admin to edit
  return (
    <div className="Info">
      <h1>User Details</h1>
      {/* Example data rendering */}
      <p>Username: {user.username}</p>
      <p>Tag: {user.tag}</p>
      {/* Add other data fields similarly */}
      
      {/* Add edit buttons, image upload functionality, etc. */}
    </div>
  );
}

export default Info;
