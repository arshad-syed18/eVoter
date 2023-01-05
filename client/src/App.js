import React from 'react';
import './App.css';
import Login from'./components/login';
import SignUp from './components/signUp';
import Home from './components/home';
import VotesPage from './components/VotesPage';
import ErrorPage from './components/ErrorPage';
import AdminHome from './adminComponents/adminHome';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {
  return (
    <div className="App" >
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp  />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/adminDashboard" element={<AdminHome />} />
          <Route path="/vote" element={<VotesPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
