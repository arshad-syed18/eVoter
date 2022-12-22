import React from 'react';
import './App.css';
import Login from'./components/login';
import SignUp from './components/signUp';
import BgImage from './assets/signUpBg.jpg'; 
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {
  console.log("Hello world");
  return (
    <div className="App" style={{backgroundImage : `url(${BgImage})`}}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp  />} /> 
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
