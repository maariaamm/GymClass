import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ClassesPage from "./pages/ClassesPage";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/LandingPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import MyProfilePage from "./pages/MyProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/classesPage" element={<ClassesPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/myBookings" element={<MyBookingsPage />} />
        <Route path="/myProfilePage" element={<MyProfilePage />} />

        {/* ADMIN */}
        <Route path="/admin/Dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
