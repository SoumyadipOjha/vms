import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Visitor Management</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {!token ? (
          <Link to="/admin-login">Admin Login</Link>
        ) : (
          <>
            <Link to="/pending-visitors">Visitors</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
