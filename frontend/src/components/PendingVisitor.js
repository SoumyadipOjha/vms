import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/PendingVisitors.css";

const AllVisitors = () => {
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/admin-login"); // Redirect if not logged in
            return;
        }
        fetchAllVisitors();
    }, [fetchAllVisitors, navigate, token]);

    const fetchAllVisitors = async () => {
        try {
            const response = await axios.get("https://mockvms.onrender.com/api/visitors", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setVisitors(response.data);
        } catch (error) {
            console.error("Error fetching visitors", error);
        } finally {
            setLoading(false);
        }
    };

    const updateVisitorStatus = async (id, newStatus) => {
        try {
            const response = await axios.put(
                `https://mockvms.onrender.com/api/visitors/${id}/status`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const updatedVisitor = response.data.visitor;

            setVisitors((prev) =>
                prev.map((visitor) =>
                    visitor._id === id
                        ? {
                              ...visitor,
                              status: updatedVisitor.status,
                              checkInTime: updatedVisitor.checkInTime
                                  ? new Date(updatedVisitor.checkInTime).toLocaleString()
                                  : "Not Checked In",
                              checkOutTime: updatedVisitor.checkOutTime
                                  ? new Date(updatedVisitor.checkOutTime).toLocaleString()
                                  : "Not Checked Out",
                          }
                        : visitor
                )
            );

            alert(`Visitor status changed to ${newStatus}!`);
        } catch (error) {
            console.error("Error updating status", error);
            alert("Failed to update visitor status.");
        }
    };

    return (
        <div className="all-visitors-container">
            <h2 className="all-visitors-heading">All Visitors</h2>

            {loading ? (
                <p className="all-visitors-message">Loading visitors...</p>
            ) : visitors.length === 0 ? (
                <p className="all-visitors-message">No visitors found</p>
            ) : (
                <table className="all-visitors-table">
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Purpose</th>
                            <th>Host</th>
                            <th>Check-In Time</th>
                            <th>Check-Out Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {visitors.map((visitor) => (
                            <tr key={visitor._id}>
                                <td>
                                    <img
                                        src={
                                            visitor.photo
                                                ? `https://mockvms.onrender.com${visitor.photo}`
                                                : "/default-avatar.png"
                                        }
                                        alt={visitor.fullName || "Visitor"}
                                        className="visitor-photo"
                                    />
                                </td>
                                <td>{visitor.fullName}</td>
                                <td>{visitor.contact || "N/A"}</td>
                                <td>{visitor.purpose}</td>
                                <td>{visitor.hostEmployee}</td>
                                <td>{visitor.checkInTime}</td>
                                <td>{visitor.checkOutTime}</td>
                                <td>{visitor.status}</td>
                                <td>
                                    <select
                                        className="status-dropdown"
                                        value={visitor.status}
                                        onChange={(e) =>
                                            updateVisitorStatus(visitor._id, e.target.value)
                                        }
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="checked-in">Checked-in</option>
                                        <option value="checked-out">Checked-out</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllVisitors;
