import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./homepage.css"
import "./info.css"
import {Link} from "react-router-dom";

function Info() {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(1); // Example id

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        console.log(response.data);
        setUser(response.data[0]); // Assuming data is an array with one user
      })
      .catch(error => {
        console.log(error);
      });
  }, [userId]);

  // The JSX will render the user details and you can add functionality for admin to edit
  return (
      <div>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css" />

              <div className="homeHeader">
                  <h1>大明军团</h1>
                  <div className="homeNav">
                      <Link href="/src/pages/development">主页</Link>
                      <Link href="/src/pages/development">日历</Link>
                      <Link href="/src/pages/development">军饷</Link>
                      <Link href="/src/pages/development">商城</Link>
                      <Link href="/src/pages/development">成员</Link>
                  </div>
                  <div className="homeLogin">
                      <a className="button" href="/src/pages/login">登录</a>
                  </div>
              </div>
          <div className="info">
              <h1>队员信息</h1>
              {/* Example data rendering */}
              <table>
                  <thead>
                  <tr>
                      <th>姓名</th>
                      <th>{user.username}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td>标签</td>
                      <td>{user.tag}</td>
                  </tr>
                  <tr>
                      <td>军衔</td>
                      <td>{user.ranks}</td>
                  </tr>
                  <tr>
                      <td>营</td>
                      <td>{user.company}</td>
                  </tr>
                  <tr>
                      <td>击杀</td>
                      <td>{user.kills}</td>
                  </tr>
                  <tr>
                      <td>出勤</td>
                      <td>{user.attandance}</td>
                  </tr>
                  <tr>
                      <td>军饷</td>
                      <td>{user.balance}</td>
                  </tr>
                  <tr>
                      <td>入队时间</td>
                      <td>{user.create_at}</td>
                  </tr>
                  </tbody>
              </table>
              {/*<p>Username: {user.username}</p>*/}
              {/*<p>Tag: {user.tag}</p>*/}
              {/*<p>Rank: {user.ranks}</p>*/}
              {/*<p>Company: {user.company}</p>*/}
              {/*<p>Kills: {user.kills}</p>*/}
              {/*<p>Attandance: {user.attandance}</p>*/}
              {/*<p>Balance: {user.balance}</p>*/}
              {/*<p>Creat at: {user.create_at}</p>*/}
              {/* Add other data fields similarly*/}

              {/* Add edit buttons, image upload functionality, etc. */}
        </div>
      </div>
  );
}

export default Info;
