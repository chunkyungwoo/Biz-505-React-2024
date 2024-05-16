import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Roulette from "../roulette/Roulette";
import App from "../App";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/roulette" element={<Roulette />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
