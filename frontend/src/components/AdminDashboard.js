import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch Employees
    fetch("https://mockvms.onrender.com/api/employee") // Change URL if needed
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));

    // Fetch Visitors
    fetch("https://mockvms.onrender.com/api/visitors", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch visitors");
        return res.json();
      })
      .then((data) => {
        console.log("Visitors Data:", data); // Debugging
        setVisitors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching visitors:", err);
        setError("Failed to load visitors.");
        setLoading(false);
      });
  }, []);

  // Function to send meeting email
  const sendMeetingEmail = (email) => {
    fetch("https://mockvms.onrender.com/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then(() => alert("Meeting email sent!"))
      .catch((err) => console.error("Error sending email:", err));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Employees List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Employees</h2>
        <ul className="mt-2">
          {employees.map((employee) => (
            <li key={employee._id} className="flex justify-between p-2 border">
              <span>
                {employee.name} ({employee.email})
              </span>
              <button
                onClick={() => sendMeetingEmail(employee.email)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Send Meeting Email
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Visitors List */}
      <div>
        <h2 className="text-xl font-semibold">Visitors</h2>
        {loading ? (
          <p>Loading visitors...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : visitors.length === 0 ? (
          <p>No visitors found.</p>
        ) : (
          <ul className="mt-2">
            {visitors.map((visitor) => (
              <li key={visitor._id} className="p-2 border">
                <p>
                  <strong>{visitor.fullName}</strong> - {visitor.contact}
                </p>
                <p>
                  <span className="font-semibold">Status:</span> {visitor.status}
                </p>
                <p>
                  <span className="font-semibold">Time Slot:</span> {visitor.timeSlot}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
