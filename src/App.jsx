import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Add from "./pages/Add";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      setUser(user);
    }
  }, []);
   const handleLogin = (userData) => {
    setUser(userData);
  };
  return (
    <Router>
      <Layout user={user} setUser={setUser}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/add" element={<Add />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />}/>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
