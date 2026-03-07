import { useState } from "react";
import API from "../../service/api";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !rating || !comment) {
      setType("error");
      setMessage("All fields are required");
      return;
    }

    try {
      await API.post(
        "/feedback",
        { name, rating, comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setType("success");
      setMessage("Thank you for your feedback!");

      setName("");
      setRating("");
      setComment("");
    } catch (error) {
      setType("error");
      setMessage("Failed to submit feedback");
    }
  };

  return (
    <div className="feedback-container">
      <h2>Share Your Feedback</h2>

      {message && (
        <p className={`feedback-message ${type}`}>
          {message}
        </p>
      )}

      <form className="feedback-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">Rate Your Stay</option>
          <option value="5">★★★★★ Excellent</option>
          <option value="4">★★★★ Very Good</option>
          <option value="3">★★★ Good</option>
          <option value="2">★★ Fair</option>
          <option value="1">★ Poor</option>
        </select>

        <textarea
          placeholder="Write your feedback here..."
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}
