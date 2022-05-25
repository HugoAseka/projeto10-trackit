import Register from "./LoginRegister/Register";
import Login from "./LoginRegister/Login";
import UserContext from "../contexts/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Habits from "./Habits";

export default function App() {
    let [token,setToken] = useState()
  return (
    <BrowserRouter>
      <UserContext.Provider value={{token,setToken}}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/habitos" element={<Habits />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
