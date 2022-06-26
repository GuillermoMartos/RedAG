import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ActiveAccount from "./Components/ActiveAccount/ActiveAccount";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";


function App() {

  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<Login />} />
        <Route path="/active-account/:token" element={<ActiveAccount />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
