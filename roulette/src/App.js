import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Roulette from "./roulette/Roulette";
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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/roulette">roulette</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/join">join</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/roulette" element={<Roulette />} />
          <Route path="/login" element={<div>login</div>} />
          <Route path="/join" element={<div>join</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
