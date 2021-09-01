import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { CourseDetail } from "./components/Courses/CourseDetail";
import CoursePage from "./pages/Course.page";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <CoursePage />
      </Route>
      <Route path="/courses/:courseId">
        <CourseDetail />
      </Route>
    </Switch>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
