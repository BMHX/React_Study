import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import BlogList from "../pages/BlogList";
import BlogDetail from "../pages/BlogDetail";
import About from "../pages/About";
import Dashboard from "../dashboard/Dashboard";
import Profile from "../dashboard/Profile";
import Fans from "../dashboard/Fans";
import Follow from "../dashboard/Follow";
import Setting from "../dashboard/Setting";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

const AppRoutes = ({ setUser }) => {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/blog/:blogId" element={<BlogDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
