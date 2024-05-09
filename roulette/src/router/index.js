import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import AppRouter from "./router";

import Roulette from "../roulette/Roulette"; // 룰렛 컴포넌트가 있는 경로로 수정해주세요

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/roulette" component={Roulette} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
