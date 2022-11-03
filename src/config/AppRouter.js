import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Result from "../screens/Result";
import StudentProfile from "../screens/StudentProfile";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Registration from "../screens/Registration";
import ShowQuiz from "../screens/ShowQuiz";
import TrainerRegistration from "../screens/TrainerRegistration";

function AppRouter() {
  const [links, setLinks] = useState([
    {
      to: "/",
      label: "Student Registration",
    },
    {
      to: "result",
      label: "Result",
    },
    {
      to: "studentProfile",
      label: "Student Profile",
    },
    {
      to: "trainterRegistration",
      label: "Trainer Registration",
    },
    {
      to: "login",
      label: "Admin",
    },
  ]);
  return (
    <>
      <Router>
        <Navbar links={links} />
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="showquiz" element={<ShowQuiz />} />
          <Route path="registration" element={<Registration />} />
          <Route path="result" element={<Result />} />
          <Route path="studentProfile" element={<StudentProfile />} />
          <Route
            path="trainterRegistration"
            element={<TrainerRegistration />}
          />
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRouter;
