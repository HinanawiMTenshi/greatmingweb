import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./homepage.css"
import "./info.css"
import "./loading.css"
import {Link} from "react-router-dom";

function Info({ currentUser }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true); // Added a loading state

    useEffect(() => {
        console.log(currentUser);
        if(currentUser) {
            axios.get(`http://localhost:3000/users/${currentUser}`)
                .then(response => {
                    setUser(response.data[0]);
                    setTimeout(() => {
                        setLoading(false);  // Set loading to false after a delay
                    }, 2000);
                })
                .catch(error => {
                    console.log(error);
                    setTimeout(() => {
                        setLoading(false);  // Also set loading to false after a delay in case of an error
                    }, 2000);
                });
        } else {
            setTimeout(() => {
                setLoading(false);  // If currentUser is not available, we also set loading to false after a delay
            }, 2000);  // If currentUser is not available, we also set loading to false to indicate no data is coming.
        }
    }, [currentUser]);

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css" />

            <div className="homeHeader">
                <h1>大明军团</h1>
                <div className="homeNav">
                    <Link to="/Homepage">主页</Link>
                    <Link to="/src/pages/development">日历</Link>
                    <Link to="/src/pages/development">商城</Link>
                    <Link to="/src/pages/development">成员</Link>
                    <Link to="/Info">个人信息</Link>
                </div>
                <div className="homeLogin">
                    <p>{currentUser}</p>
                </div>
            </div>
            <div className="info">
                <h1>队员信息</h1>
                {/* Example data rendering */}
                {loading ? (  // 有条件地渲染加载内容
                    <div>
                        <div className="loading-spinner"></div>
                        <p>听说智祖喜欢borgo，只是不愿意表达</p>
                    </div>
                ) : (
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
                            <td>{user.enrollmentTime}</td>
                        </tr>
                        <tr>
                            <td>账号创建时间</td>
                            <td>{user.create_at}</td>
                        </tr>
                        </tbody>
                    </table>
                )}
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
