import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTours = async () => {
    try {
      const res = await axios.get("/api/tours");  // adjust base URL
      setTours(res.data);
    } catch (error) {
      console.error("Error fetching tours:", error);
      // optionally show message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      await axios.delete(`/api/tours/${id}`);
      // refresh list
      setTours((prev) => prev.filter(t => t._id !== id));
    } catch (error) {
      console.error("Error deleting tour:", error);
      // optionally show error
    }
  };

  return (
    <div className="admin-tours-page">
      <div className="header">
        <h1>Manage Tours</h1>
        <button onClick={() => navigate("/admin/tours/new")}>
          Create New Tour
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="tours-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Dates</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour._id}>
                <td>{tour.title}</td>
                <td>{tour.pricePerPerson}</td>
                <td>
                  {tour.availableDates
                    ? tour.availableDates.map(d => new Date(d).toLocaleDateString()).join(", ")
                    : "—"}
                </td>
                <td>{tour.isActive ? "Yes" : "No"}</td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/tours/edit/${tour._id}`)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(tour._id)}>
                    Delete
                  </button>
                  <button onClick={() => navigate(`/tours/${tour._id}`)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminTours;
