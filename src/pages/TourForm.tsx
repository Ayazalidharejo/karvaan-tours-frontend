import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const initialFormState = {
  title: "",
  summary: "",
  pricePerPerson: 0,
  duration: "",
  availableDates: [],  // maybe array of date strings
  groupSize: { min: 1, max: 10 },
  tourType: "Group",
  destinations: [],
  itinerary: [],
  pickupPoints: [],
  languages: [],
  faqs: [],
  reviews: [],  // probably admin doesn’t enter reviews manually
  guideQualifications: [],
  includes: [],
  excludes: [],
  importantNotes: [],
  isActive: true,
};

const TourForm = () => {
  const { id } = useParams(); // if editing
  const navigate = useNavigate();
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      setLoading(true);
      axios.get(`/api/tours/${id}`)
        .then(res => {
          setForm(res.data);
        })
        .catch(err => {
          console.error("Error loading tour", err);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, index, field, value) => {
    // for arrays like destinations, itinerary
    setForm(prev => {
      const newArr = [...(prev[section] || [])];
      newArr[index] = { ...newArr[index], [field]: value };
      return { ...prev, [section]: newArr };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`/api/tours/${id}`, form);
      } else {
        await axios.post(`/api/tours`, form);
      }
      navigate("/admin/tours");
    } catch (error) {
      console.error("Error saving tour", error);
      // show error
    }
  };

  return (
    <div className="tour-form-page">
      <h2>{isEdit ? "Edit Tour" : "New Tour"}</h2>
      {loading ? <p>Loading...</p> : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Summary:</label>
            <textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Price Per Person:</label>
            <input
              name="pricePerPerson"
              type="number"
              value={form.pricePerPerson}
              onChange={handleChange}
            />
          </div>
          {/* more fields: duration, dates, etc. */}
          {/* Example nested: destinations */}
          <div>
            <h3>Destinations</h3>
            {form.destinations && form.destinations.map((dest, i) => (
              <div key={i} className="nested-dest-item">
                <input
                  name={`dest-name-${i}`}
                  placeholder="Name"
                  value={dest.name}
                  onChange={e =>
                    handleNestedChange("destinations", i, "name", e.target.value)
                  }
                />
                <input
                  placeholder="Description"
                  value={dest.description}
                  onChange={e =>
                    handleNestedChange("destinations", i, "description", e.target.value)
                  }
                />
                {/* etc */}
              </div>
            ))}
            <button type="button" onClick={() => 
              setForm(prev => ({ 
                ...prev, 
                destinations: [...(prev.destinations||[]), { name: "", description: "", duration: "", difficulty: "Easy", highlights: [], tips: "" }]
              }))
            }>
              + Add Destination
            </button>
          </div>

          {/* similarly for pickupPoints, itinerary etc */}

          <button type="submit">{isEdit ? "Update Tour" : "Create Tour"}</button>
        </form>
      )}
    </div>
  );
};

export default TourForm;
