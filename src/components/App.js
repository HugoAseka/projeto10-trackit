import Register from "./LoginRegister/Register";
import Login from "./LoginRegister/Login";
import Historico from "../components/Historico.js";
import Hoje from "./Hoje";
import UserContext from "../contexts/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Habits from "./Habitos";
import React from "react";

export default function App() {
  const [body, setBody] = useState({});
  let [percent, setPercent] = useState(0);
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ body, setBody, percent, setPercent }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/hoje" element={<Hoje />} />
          <Route path="/habitos" element={<Habits />} />
          <Route path="/historico" element={<Historico />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
