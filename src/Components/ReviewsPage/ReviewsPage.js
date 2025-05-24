import React, { useState } from 'react';
import ReviewForm from '../ReviewForm/ReviewForm';

const ReviewPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);

  const handleReviewSubmit = (data) => {
    setReviews([...reviews, data]);
    setSubmitted(true);
  };

  return (
    <div>
      <h1>Feedback</h1>

      {!submitted && <p>Please provide your feedback below:</p>}

      <ReviewForm onSubmit={handleReviewSubmit} isSubmitted={submitted} />

      <hr />

      <h2>Submitted Reviews:</h2>
      {reviews.length > 0 ? (
        reviews.map((rev, idx) => (
          <div key={idx} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
            <strong>{rev.name}</strong> ({rev.rating} ⭐)
            <p>{rev.review}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewPage;
