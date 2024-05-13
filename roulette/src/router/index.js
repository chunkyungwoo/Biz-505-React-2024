import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import roulette from "../roulette/roulette";
import App from "../App";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={App} />
        <Route path="/roulette" component={roulette} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
