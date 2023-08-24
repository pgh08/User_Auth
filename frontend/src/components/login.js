import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleOnchageEmail = (e) => {
        let email = e.target.value;
        setEmail(email);
    }

    const handleOnchagePassword = (e) => {
        let password = e.target.value;
        setPassword(password);
    }


    const loginStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        boxSizing: "border-box"
    }


    async function loginUser(event) {
        event.preventDefault();

        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        let data = await response.json();

        if(data.user){

            // Storing JWT token.
            localStorage.setItem('token', data.user);

            props.showAlert("Login is success", "success");
            props.toggleLogin();
            navigate("/dashboard");
        }
        else{
            props.showAlert(data.error, "danger");
        }
    }



    return (
        <>
            <form style={loginStyle}>
                <h1 style={{ fontSize: "1.7rem", fontWeight: "bolder" }}>New User please Register</h1>
                <Link type="button" className="btn btn-primary btn-sm mt-2 mb-5" to="/register">Register</Link>
                <p>OR</p>
                <h1 className="mb-5" style={{ fontSize: "2.7rem", fontWeight: "bolder" }}>Login</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleOnchageEmail} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleOnchagePassword} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={loginUser}>Login</button>
            </form>
        </>
    );
}

export default Login;