import React from "react";
import { Link } from "react-router-dom";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - Branding */}
        <div className="footer-logo">
          <h2>Visitor Management</h2>
          <p>Efficiently managing your workplace visitors.</p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/pending-visitors">Pending Visitors</Link>
          <Link to="/admin-login">Admin Login</Link>
        </div>

        {/* Right Section - Contact Info */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: support@visitorapp.com</p>
          <p>Phone: +123 456 7890</p>
          <div className="footer-social">
            <a href="/" className="social-icon">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="/" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/" className="social-icon">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer Text */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Visitor Management. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
