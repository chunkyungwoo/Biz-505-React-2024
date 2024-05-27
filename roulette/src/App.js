import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Roulette from "./roulette/Roulette";
import Login from "./roulette/login";
import Join from "./roulette/join";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <header className="header">
          <h1>뭐먹지</h1>
        </header>
        <nav>
          <ul>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/roulette">룰렛</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/join">회원가입</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<div>안녕</div>} />
          <Route path="/roulette" element={<Roulette />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
