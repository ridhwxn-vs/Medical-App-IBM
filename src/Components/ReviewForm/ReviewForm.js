import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ onSubmit, isSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0,
  });

  const [warning, setWarning] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRatingChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      rating: parseInt(e.target.value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.review && formData.rating > 0) {
      onSubmit(formData); // Pass data to parent (e.g. ReviewPage)
      setFormData({ name: '', review: '', rating: 0 });
      setWarning(false);
    } else {
      setWarning(true);
    }
  };

  return (
    <div className="review-form-container">
      <h2>Give Your Feedback</h2>
      {warning && <p className="warning">Please fill all fields and select a rating.</p>}

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitted}
        />

        <label>Review:</label>
        <textarea
          name="review"
          value={formData.review}
          onChange={handleChange}
          disabled={isSubmitted}
        />

        <label>Rating:</label>
        <select
          name="rating"
          value={formData.rating}
          onChange={handleRatingChange}
          disabled={isSubmitted}
        >
          <option value="0">Select Rating</option>
          {[1, 2, 3, 4, 5].map((val) => (
            <option key={val} value={val}>{val} ⭐</option>
          ))}
        </select>

        <button type="submit" disabled={isSubmitted}>
          {isSubmitted ? "Submitted" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
