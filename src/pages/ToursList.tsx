import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ToursList = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/tours")
      .then(res => {
        // maybe filter only active tours
        const activeTours = res.data.filter(t => t.isActive);
        setTours(activeTours);
      })
      .catch(err => console.error("Error loading tours", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading tours...</p>;

  return (
    <div className="tours-list">
      <h1>Available Tours</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map(tour => (
          <div key={tour._id} className="tour-card border shadow rounded p-4">
            <h2>{tour.title}</h2>
            <p>{tour.summary}</p>
            <p>Price: {tour.pricePerPerson}</p>
            <p>Duration: {tour.duration}</p>
            <Link to={`/tours/${tour._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToursList;
