import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Frontpage.css";

const FrontPage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/visitor-form"); // Navigate to the Home Page
  };

  return (
    <div className="frontpage">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to Visitor Management System</h1>
          <p>Efficiently manage visitors, schedule appointments, and enhance security.</p>
          <button className="cta-button" onClick={handleRegister}>
            Register
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>📅 Appointment Scheduling</h3>
            <p>Visitors can book time slots and get approval from the host.</p>
          </div>
          <div className="feature-card">
            <h3>📷 Photo Capture</h3>
            <p>Take live visitor photos for verification and record-keeping.</p>
          </div>
          <div className="feature-card">
            <h3>📩 Email Notifications</h3>
            <p>Hosts receive an email notification when a visitor registers.</p>
          </div>
          <div className="feature-card">
            <h3>🛠️ Admin Dashboard</h3>
            <p>Admins can track, approve, or reject visitor requests.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works?</h2>
        <div className="steps">
          <div className="step">
            <span>1️⃣</span>
            <h4>Register as a Visitor</h4>
            <p>Fill in your details and capture a live photo.</p>
          </div>
          <div className="step">
            <span>2️⃣</span>
            <h4>Select Host & Time Slot</h4>
            <p>Choose an employee and a preferred time slot.</p>
          </div>
          <div className="step">
            <span>3️⃣</span>
            <h4>Get Approval</h4>
            <p>The host receives an email and approves or rejects your request.</p>
          </div>
          <div className="step">
            <span>4️⃣</span>
            <h4>Meet Your Host</h4>
            <p>Upon approval, visit the premises and meet your host.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FrontPage;
