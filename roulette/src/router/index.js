import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Roulette from "../roulette/Roulette";
import Login from "../roulette/login";
import Join from "../roulette/join";
import App from "../App";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/roulette" element={<Roulette />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
