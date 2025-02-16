import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/employeeLogin.css"; // External CSS

const EmployeeLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passkey, setPasskey] = useState("");
  const navigate = useNavigate();

  const correctPasskey = "8670226518"; // Fixed passkey

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://mockvms.onrender.com/api/employee/login", { username, password });
      localStorage.setItem("token", response.data.token);
      navigate("/pending-visitors"); // Redirect after login
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      {/* Left Section - Company Info */}
      <div className="login-info">
        <h1>Welcome to Visitor Management</h1>
        <p>
          Our system ensures smooth visitor tracking, appointment scheduling, and security management. 
          Employees can log in to manage visitor records efficiently.
        </p>
        <h3>Why Choose Us?</h3>
        <ul>
          <li>✔ Efficient visitor tracking</li>
          <li>✔ Secure access for employees</li>
          <li>✔ Automated appointment notifications</li>
          <li>✔ Easy-to-use interface</li>
        </ul>
        <h3>Contact Us:</h3>
        <p>📧 support@visitorapp.com | ☎ +123 456 7890</p>
      </div>

      {/* Right Section - Login Form */}
      <div className="login-box">
        <h2>Employee Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Passkey"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            required
          />
          <button
            type="submit"
            className={passkey === correctPasskey ? "active-button" : "disabled-button"}
            disabled={passkey !== correctPasskey}
          >
            Login
          </button>
          <p>Don't have an account? <a href="/employee-register">Register here</a></p>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;
