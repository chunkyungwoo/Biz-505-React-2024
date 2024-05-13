import React from "react";
import AppRouter from "./router";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={<div>Home입니다.</div>} />
          <Route
            path="/roulette"
            Component={<div>roulette입니다.</div>}
          />
          <Route path="/login" Component={<div>login입니다.</div>} />
          <Route path="/join" Component={<div>join입니다.</div>} />
        </Routes>
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
      </BrowserRouter>
      <AppRouter />
    </>
  );
}

export default App;
