import { useState } from "react";
import API from "../../service/api";
import { useNavigate } from "react-router-dom";

export default function PaymentForm({ bookingId, amount }) {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      setType("error");
      setMessage("Select a payment method");
      return;
    }

    try {
      await API.post(
        "/payments",
        { bookingId, amount, paymentMethod },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setType("success");
      setMessage("Payment successful ✅");

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setType("error");
      setMessage(err.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="payment-box">
      <h3>Payment</h3>

      {message && <p className={`payment-msg ${type}`}>{message}</p>}

      <form onSubmit={handlePayment}>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Payment Method</option>
          <option value="upi">UPI</option>
          <option value="card">Card</option>
          <option value="netbanking">Net Banking</option>
        </select>

        <button type="submit">Pay ₹{amount}</button>
      </form>
    </div>
  );
}
