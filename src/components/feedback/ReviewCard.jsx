import React from "react";

export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-header">
        <h4 className="review-name">{review.name}</h4>
        <div className="review-rating">
          {"★".repeat(review.rating)}
          {"☆".repeat(5 - review.rating)}
        </div>
      </div>

      <p className="review-comment">{review.comment}</p>

      <p className="review-date">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
