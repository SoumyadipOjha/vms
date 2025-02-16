import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Webcam from "react-webcam";

const VisitorForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM",
    "1:00 PM - 3:00 PM",
    "3:00 PM - 5:00 PM",
  ];

  // Fetch employee list from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://mockvms.onrender.com/api/employees"
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Capture photo from webcam
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  // Convert DataURL to File
  const dataURLtoFile = (dataUrl, fileName) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  // Form Submission
  const onSubmit = async (data) => {
    if (!selectedEmployee) {
      alert("Please select a Host Employee.");
      return;
    }

    if (!capturedImage) {
      alert("Please capture a photo before submitting.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("contact", data.contact);
      formData.append("purpose", data.purpose);
      formData.append("hostEmployee", selectedEmployee);
      formData.append("timeSlot", data.timeSlot);
      formData.append("company", data.company || "");

      if (capturedImage) {
        const photoFile = dataURLtoFile(capturedImage, "visitor_photo.jpg");
        formData.append("photo", photoFile);
      }

      await axios.post("https://mockvms.onrender.com/api/visitors", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response ? error.response.data : error
      );
      alert("Form submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Visitor Registration</h2>

      {isSubmitted ? (
        <h3 style={{ color: "#007bff", fontSize: "18px", fontWeight: "600" }}>
          Waiting for employee approval...
        </h3>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <label style={styles.label}>Full Name:</label>
          <input
            {...register("fullName", { required: "Full Name is required" })}
            style={styles.input}
          />
          {errors.fullName && (
            <p style={styles.errorText}>{errors.fullName.message}</p>
          )}

          <label style={styles.label}>Contact:</label>
          <input
            type="text"
            {...register("contact", { required: "Contact is required" })}
            style={styles.input}
          />
          {errors.contact && (
            <p style={styles.errorText}>{errors.contact.message}</p>
          )}

          <label style={styles.label}>Purpose:</label>
          <select
            {...register("purpose", { required: "Purpose is required" })}
            style={styles.select}
          >
            <option value="">Select</option>
            <option value="Meeting">Meeting</option>
            <option value="Interview">Interview</option>
            <option value="Delivery">Delivery</option>
          </select>
          {errors.purpose && (
            <p style={styles.errorText}>{errors.purpose.message}</p>
          )}

          <label style={styles.label}>Time Slot:</label>
          <select
            {...register("timeSlot", { required: "Please select a time slot" })}
            style={styles.select}
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.timeSlot && (
            <p style={styles.errorText}>{errors.timeSlot.message}</p>
          )}

          <label style={styles.label}>Host Employee:</label>
          {employees.length > 0 ? (
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              required
              style={styles.select}
            >
              <option value="">Select an Employee</option>
              {employees.map((emp, index) => (
                <option key={index} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </select>
          ) : (
            <p style={styles.errorText}>No employees available</p>
          )}

          <label style={styles.label}>Capture Photo:</label>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={styles.webcam}
          />
          <button
            type="button"
            onClick={capturePhoto}
            style={styles.captureButton}
          >
            Capture
          </button>

          {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured"
              style={styles.imagePreview}
            />
          )}

          <button type="submit" disabled={loading} style={styles.submitButton}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

// Inline styles for a professional look
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    maxWidth: "500px",
    margin: "auto",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  select: {
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
  },
  webcam: {
    width: "100%",
    marginBottom: "10px",
  },
  captureButton: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    marginBottom: "10px",
  },
  imagePreview: {
    width: "200px",
    margin: "10px auto",
  },
  submitButton: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
};

export default VisitorForm;
