import React, { useState } from "react";

function Register(props) {
    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnchageName = (e) => {
    let name = e.target.value;
    setName(name);
  }

  const handleOnchageEmail = (e) => {
    let email = e.target.value;
    setEmail(email);
  }

  const handleOnchagePassword = (e) => {
    let password = e.target.value;
    setPassword(password);
  }

  const registerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "2px solid red",
    margin: "100px",
    padding: "100px",
    boxSizing: "border-box"
  }

  const widthStyle = {
    width: "300px"
  }

    return (
        <div style={registerStyle}>
            <p style={{fontSize: "2.7rem", fontWeight: "bolder"}}>Sign Up</p>
            <div className="form-floating mb-3" style={widthStyle}>
                <input type="text" className="form-control" id="floatingname" placeholder="username" value={name} onChange={handleOnchageName} />
                <label htmlFor="floatingname">Username</label>
            </div>
            <div className="form-floating mb-3" style={widthStyle}>
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={handleOnchageEmail} />
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating" style={widthStyle}>
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={handleOnchagePassword} />
                <label htmlFor="floatingPassword">Password</label>
            </div>
        </div>
    );
}

export default Register;