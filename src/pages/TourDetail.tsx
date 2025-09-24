import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/tours/${id}`)
      .then(res => setTour(res.data))
      .catch(err => console.error("Error fetching tour detail", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading tour...</p>;
  if (!tour) return <p>Tour not found</p>;

  return (
    <div className="tour-detail-page">
      <h1>{tour.title}</h1>
      <p>{tour.summary}</p>
      <p>Price: {tour.pricePerPerson}</p>
      <p>Duration: {tour.duration}</p>
      <h2>Destinations</h2>
      {tour.destinations && tour.destinations.map((d, i) => (
        <div key={i} className="destination-block">
          <h3>{d.name} ({d.difficulty})</h3>
          <p>{d.description}</p>
          <p>Duration: {d.duration}</p>
          {d.highlights && <ul>
            {d.highlights.map((h, hi) => <li key={hi}>{h}</li>)}
          </ul>}
          <p><strong>Tip:</strong> {d.tips}</p>
        </div>
      ))}
      <h2>Itinerary</h2>
      {tour.itinerary && tour.itinerary.map((item, i) => (
        <div key={i}>
          <h4>{item.time} - {item.activity} ({item.duration})</h4>
          <p>{item.description}</p>
        </div>
      ))}
      <h2>Pickup Points</h2>
      {tour.pickupPoints && tour.pickupPoints.map((p, i) => (
        <div key={i}>
          <p><strong>{p.location}</strong> — {p.time}</p>
          <p>{p.landmark}</p>
          <p>{p.instructions}</p>
        </div>
      ))}
      <h2>Languages</h2>
      {tour.languages && tour.languages.map((lang, i) => (
        <p key={i}>{lang.name} ({lang.level})</p>
      ))}
      <h2>FAQs</h2>
      {tour.faqs && tour.faqs.map((f, i) => (
        <div key={i}>
          <p><strong>Q:</strong> {f.question}</p>
          <p><strong>A:</strong> {f.answer}</p>
        </div>
      ))}
      {/* etc: guide qualifications, includes/excludes */}
    </div>
  );
};

export default TourDetail;
