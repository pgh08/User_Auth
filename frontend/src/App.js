import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Register from "./components/Register.js";

function App() {

  const [loginState, setLoginState] = useState(null);

  return (
    <Router>
      <Navbar state={loginState}/>
      <Routes>
        <Route exact path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
