import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashBoard from "./DashBoard/DashBoard";
import Page1 from "./Pages/Page1/Page1";
import Page2 from "./Pages/Page2/Page2";
import Page3 from "./Pages/Page3/Page3";
import Page4 from "./Pages/Page4/Page4";
import Page5 from "./Pages/Page5/Page5";
import Page6 from "./Pages/Page6/Page6";
import OutputPage from "./Pages/OutputPage";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Home from "./Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Register} />
        <Route path="/dashboard" exact component={DashBoard} />
        <Route path="/generateQuestionPaper" component={Page1} />
        <Route path="/page2" component={Page2} />
        <Route path="/page3" component={Page3} />
        <Route path="/page4" component={Page4} />
        <Route path="/page5" component={Page5} />
        <Route path="/page6" component={Page6} />
        <Route path="/output" component={OutputPage} />
      </Switch>
    </Router>
  );
};

export default App;
