import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashBoard from "./DashBoard/DashBoard";
import GenerateQuestionsOutput from "./Pages/GenerateQuestions/GenerateQuestionsOutput";
import GenerateQuestions from "./Pages/GenerateQuestions/GenerateQuestions";
import GenerateQuizForm from "./Pages/GenerateQuiz/GenerateQuizForm";
import GenerateQuizOutput from "./Pages/GenerateQuiz/GenerateQuizOutput";
import Page2 from "./Pages/Page2/Page2";
import TakeExam from "./Pages/TakeExam/TakeExam";
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
        <Route path="/generateQuestions" component={GenerateQuestions} />
        <Route path="/questionsList" component={GenerateQuestionsOutput} />
        <Route path="/page2" component={Page2} />
        <Route path="/generateQuizForm" component={GenerateQuizForm} />
        <Route path="/generateQuizOutput" component={GenerateQuizOutput} />
        <Route path="/takeExam" component={TakeExam} />
        <Route path="/page4" component={Page4} />
        <Route path="/page5" component={Page5} />
        <Route path="/page6" component={Page6} />
        <Route path="/output" component={OutputPage} />
      </Switch>
    </Router>
  );
};

export default App;
