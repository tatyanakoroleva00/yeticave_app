import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Add from "./pages/Add";
import History from "./pages/History";
import { Show } from "./pages/Show";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Category from "./pages/Category";
import Search from "./pages/Search";
import axios from "axios";
import MyBets from "./pages/MyBets";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    axios.get('/api/check_session.php')
    .then(({data}) => setUser(data))
  }, []);

  const handleLogin = (userdata) => {
    setUser(userdata);
  };
  return (
    <Router>
      <Layout user={user} setUser={setUser}>
        <Routes>
          <Route path="/" element={<HomePage user={user}/>} />
          <Route path="add" element={<Add />} />
          <Route path="login" element={<Login onLogin={handleLogin} />}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="show/:id" element={<Show user={user} />} />
          <Route path="history" element={<History />}/>
          <Route path="category/:category" element={<Category />}/>
          <Route path="/search" element={<Search />} />
          <Route path="/mybets" element={<MyBets />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
