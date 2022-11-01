import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Home from "../screens/Home";
import About from "../screens/About";
import Services from "../screens/Services";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Registration from "../screens/Registration";
import CourseForm from "../screens/adminScreens/CourseForm";
import QuizForm from "../screens/adminScreens/QuizForm";

function AppRouter() {
  const [links, setLinks] = useState([
    {
      to: "/",
      label: "Home",
    },
    {
      to: "about",
      label: "About",
    },
    {
      to: "services",
      label: "Services",
    },
    {
      to: "Signup",
      label: "Sign Up",
    },
    {
      to: "login",
      label: "Sign In",
    },
    {
      to: "dashboard",
      label: "Admin Dashboard",
    },
  ]);
  return (
    <>
      <Router>
        <Navbar links={links} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="registration" element={<Registration />} />
          <Route path="courseform" element={<CourseForm />} />
          <Route path="quizform" element={<QuizForm />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRouter;
