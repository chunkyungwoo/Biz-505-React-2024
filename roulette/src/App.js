import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <header className="header">
        <h1>뭐먹지</h1>
      </header>
      <nav>
        <ul>
          <li>
            <link to="/">Home</link>
          </li>
          <li>
            <link to="/roulette">roulette</link>
          </li>
          <li>
            <link to="/login">login</link>
          </li>
          <li>
            <link to="/join">join</link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default App;
