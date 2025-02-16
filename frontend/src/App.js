import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PendingVisitors from "./components/PendingVisitor";
import AdminLogin from "./components/AdminLogin";
import VisitorForm from "./components/visitorForm";
import Navbar from "./components/navbar";
import EmployeeRegister from "./components/EmployeeRegister";
import AdminDashboard from "./components/AdminDashboard";
import FrontPage from "./components/Frontpage";
import Footer from "./components/Footer";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/" element={<FrontPage />} />
      <Route path="/pending-visitors" element={<PendingVisitors />} />
      <Route path="/employee-register" element={<EmployeeRegister />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/visitor-form" element={<VisitorForm />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
