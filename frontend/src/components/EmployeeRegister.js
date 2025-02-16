import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./styles/EmployeeRegister.css"; // External CSS file

const EmployeeRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const [passkey, setPasskey] = useState("");
  const navigate = useNavigate();

  const correctPasskey = "8670226518"; // Fixed passkey

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://mockvms.onrender.com/api/employee/register",
        data
      );
      setMessage(response.data.message);
      navigate("/admin-login"); // Redirect to login after registration
    } catch (error) {
      setMessage("Error registering employee. Try again.");
    }
  };

  return (
    <div className="register-container">
      {/* Left Section - Information */}
      <div className="register-info">
        <h1>Join Our Team</h1>
        <p>
          Register as an employee to access and manage visitor records
          efficiently.
        </p>
        <h3>Why Register?</h3>
        <ul>
          <li>✔ Secure access to visitor details</li>
          <li>✔ Automated appointment updates</li>
          <li>✔ Easy visitor tracking</li>
          <li>✔ Professional dashboard</li>
        </ul>
        <p>
          Need help? Contact us at <strong>support@visitorapp.com</strong>
        </p>
        <p className="login-link">
          Already registered? <a href="/employee-login">Login here</a>
        </p>
      </div>

      {/* Right Section - Registration Form */}
      <div className="register-box">
        <h2>Employee Registration</h2>
        {message && (
          <p
            className={
              message.includes("Error") ? "error-message" : "success-message"
            }
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name</label>
          <input {...register("name", { required: "Name is required" })} />
          {errors.name && <p className="error-text">{errors.name.message}</p>}

          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}

          <label>Username</label>
          <input
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="error-text">{errors.username.message}</p>
          )}

          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: 6,
            })}
          />
          {errors.password && (
            <p className="error-text">Password must be at least 6 characters</p>
          )}

          <label>Passkey</label>
          <input
            type="password"
            placeholder="Enter Passkey"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            required
          />
          <p className="note">
            * Only authorized personnel should enter the correct passkey.
          </p>

          <button
            type="submit"
            className={
              passkey === correctPasskey ? "active-button" : "disabled-button"
            }
            disabled={passkey !== correctPasskey}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegister;
