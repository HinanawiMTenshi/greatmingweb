import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Helmet from "react-helmet"
import "./Register.css"

async function registerUser(credentials) {
    return fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json());
}

export default function Register() {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [tag, setTag] = useState("");
    const [ranks, setRanks] = useState("");
    const [company, setCompany] = useState("");
    const [kills, setKills] = useState(0);
    const [attendance, setAttendance] = useState(0);
    const [balance, setBalance] = useState(0);
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");

    const handleLoginClick = () => {
        navigate('/Login');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const enrollmentTime = `${year}-${month}-${day}`;
        const response = await registerUser({
            username,
            tag,
            ranks,
            company,
            kills,
            attendance,
            balance,
            password,
            enrollmentTime
        });
        // setToken(response);
        // Assuming the registration process also logs in the user
        // You can navigate to the homepage or login page as needed.
        navigate('/Login');
    };

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css" />
            <Helmet>
                <title>注册界面</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Helmet>
            <div className="register-wrapper">
                <fieldset>
                    <h1>大明军团注册界面</h1>
                    <p>请注意，全程不要使用中文和小数</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="nameField">姓名</label>
                        <input type="text" placeholder="请输入姓名" id="nameField" onChange={(e) => setUserName(e.target.value)} />

                        <label htmlFor="tagField">标签</label>
                        <input type="text" placeholder="请输入标签" id="tagField" onChange={(e) => setTag(e.target.value)} />

                        <label htmlFor="ranksField">军衔</label>
                        <input type="text" placeholder="请输入军衔" id="ranksField" onChange={(e) => setRanks(e.target.value)} />

                        <label htmlFor="companyField">营</label>
                        <input type="text" placeholder="请输入营" id="companyField" onChange={(e) => setCompany(e.target.value)} />

                        <label htmlFor="killsField">击杀</label>
                        <input type="number" placeholder="请输入击杀数" id="killsField" onChange={(e) => setKills(e.target.value)} />

                        <label htmlFor="attendanceField">出勤</label>
                        <input type="number" placeholder="请输入出勤数" id="attendanceField" onChange={(e) => setAttendance(e.target.value)} />

                        <label htmlFor="balanceField">军饷</label>
                        <input type="number" placeholder="请输入军饷余额" id="balanceField" onChange={(e) => setBalance(e.target.value)} />


                        <label htmlFor="passwordField">密码</label>
                        <input type="password" placeholder="请输入密码" id="passwordField" onChange={(e) => setPassword(e.target.value)} />

                        <label htmlFor="passwordField">入队时间</label>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <input type="text" placeholder="年" id="yearField" onChange={(e) => setYear(e.target.value)} />

                            <input type="text" placeholder="月" id="monthField" onChange={(e) => setMonth(e.target.value)} />

                            <input type="text" placeholder="日" id="dayField" onChange={(e) => setDay(e.target.value)} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button className="button button-primary" type="submit">注册</button>
                            <button className="button button-outline" onClick={handleLoginClick}>返回登录</button>
                        </div>
                    </form>
                </fieldset>
            </div>
        </div>
    );
}

Register.propTypes = {
    setToken: PropTypes.func.isRequired
}
