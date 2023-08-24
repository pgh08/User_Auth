import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Register from "./components/Register.js";
import Login from "./components/login.js";
import Alert from "./components/alert.js";
import Dashboard from "./components/Dashboard.js";
import { Buffer } from "buffer";
global.Buffer = Buffer;

function App() {

  const [loginState, setLoginState] = useState(false);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      typ: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  const toggleLogin = () => {
    if (loginState) {
      setLoginState(false);
    }
    else {
      setLoginState(true);
    }
  }

  return (
    <>
    
      <Router>
        <Navbar toggleLogin={toggleLogin} loginState={loginState}/>
        <Alert alert={alert} />
        <Routes>
          <Route exact path="/register" element={<Register toggleLogin={toggleLogin} showAlert={showAlert} />} />
          <Route exact path="/login" element={<Login toggleLogin={toggleLogin} showAlert={showAlert} />} />
          <Route exact path="/dashboard" element={<Dashboard showAlert={showAlert} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
