import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashBoard from "./DashBoard/DashBoard";
import GenerateQuestionsOutput from "./Pages/GenerateQuestions/GenerateQuestionsOutput";
import GenerateQuestions from "./Pages/GenerateQuestions/GenerateQuestions";
import GenerateQuizForm from "./Pages/GenerateQuiz/GenerateQuizForm";
import GenerateQuizOutput from "./Pages/GenerateQuiz/GenerateQuizOutput";
import Page2 from "./Pages/Account/Profile";
import TakeExam from "./Pages/TakeExam/TakeExam";
import Page4 from "./Pages/Page4/Page4";
import Page5 from "./Pages/Page5/Page5";
import Page6 from "./Pages/Page6/Page6";
import OutputPage from "./Pages/OutputPage";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Home from "./Home";
import ExploreTopic from "./Pages/TopicExploration/ExploreTopic";
import GenerateTopics from "./Pages/TopicExploration/GenerateTopics";
import TeachingPreperationForm from "./Pages/TeachingPreperation/TeachingPreperationForm";
import TeachingOutline from "./Pages/TeachingPreperation/TeachingOutline";
import TalkWithBook from "./Pages/TalkWithBook/TalkWithBook";
import GenerateAssignmentForm from "./Pages/GenerateAssignment/GenerateAssignmentForm";
import GenerateAssignmentOutput from "./Pages/GenerateAssignment/GenerateAssignmentOutput";
import ViewFlashCards from "./Pages/FlashCards/ViewFlashCards";
import GenerateFlashCards from "./Pages/FlashCards/GenerateFlashCards";
import Interconnection from "./Pages/FindInterconnection/Interconnection";
import FindInterconnectionForm from "./Pages/FindInterconnection/FindInterconnectionForm";
import CareerMindMap from "./Pages/CareerMindMap/CareerMindMap";
import Chat from "./Pages/Account/Chat";
import Profile from "./Pages/Account/Profile";
import QuestionsRepository from "./Pages/QuestionsRepository/QuestionsRepository";

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
        <Route path="/ExploreTopic" component={ExploreTopic} />
        <Route path="/GenerateTopics" component={GenerateTopics} />
        <Route path="/TeachingPreperationForm" component={TeachingPreperationForm} />
        <Route path="/TeachingOutline" component={TeachingOutline} />
        <Route path="/TalkWithBook" component={TalkWithBook} />
        <Route path="/GenerateAssignmentForm" component={GenerateAssignmentForm} />
        <Route path="/GenerateAssignmentOutput" component={GenerateAssignmentOutput} />
        <Route path="/ViewFlashCards" component={ViewFlashCards} />
        <Route path="/GenerateFlashCards" component={GenerateFlashCards} />
        <Route path="/Interconnection" component={Interconnection} />
        <Route path="/FindInterconnectionForm" component={FindInterconnectionForm} />
        <Route path="/CareerMindMap" component={CareerMindMap} />
        <Route path="/QuestionsRepository" component={QuestionsRepository} />
        <Route path="/Chat" component={Chat} />
        <Route path="/Profile" component={Profile} />
      </Switch>
    </Router>
  );
};

export default App;
