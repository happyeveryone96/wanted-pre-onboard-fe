import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import ToDo from "./pages/ToDo/ToDo";
import Header from "./components/Header";

function App() {
  const [isLogin, setIsLogin] = useState(undefined);
  return (
    <BrowserRouter>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route path="/" element={<LoginSignup setIsLogin={setIsLogin} />} />
        <Route path="/todo" element={<ToDo isLogin={isLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
