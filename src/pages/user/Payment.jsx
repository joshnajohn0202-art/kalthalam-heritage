import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/api";
import "./Payment.css";

const PAYMENTS_KEY = "payments";
const upiIdRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{2,}$/;
const FIXED_COTTAGES = ["Premium Villa", "Deluxe Cottage"];
const COTTAGE_BASE_RATES = {
  "Deluxe Cottage": 5000,
  "Premium Villa": 10000,
};
const SPECIAL_DATE_DISCOUNTS = [
  {
    id: "summer-saver",
    label: "Summer Saver",
    from: "04-01",
    to: "06-15",
    percent: 8,
    cottages: ["Deluxe Cottage", "Premium Villa"],
  },
  {
    id: "monsoon-special",
    label: "Monsoon Special",
    from: "06-16",
    to: "09-15",
    percent: 12,
    cottages: ["Deluxe Cottage", "Premium Villa"],
  },
  {
    id: "year-end-offer",
    label: "Year End Offer",
    from: "12-20",
    to: "01-05",
    percent: 15,
    cottages: ["Deluxe Cottage", "Premium Villa"],
  },
];

const Payment = () => {
  const navigate = useNavigate();
  const upiId = "kalthalam@upi";
  const upiName = "Kalthalam Heritage Resort";
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [amount, setAmount] = useState("6000");
  const [payStatus, setPayStatus] = useState("idle");
  const [statusText, setStatusText] = useState("");
  const [payments, setPayments] = useState(JSON.parse(localStorage.getItem(PAYMENTS_KEY) || "[]"));
  const [receipt, setReceipt] = useState(null);
  const [selectedSummary, setSelectedSummary] = useState({
    travelPackages: [],
    addons: [],
    nearbySpots: [],
    travelExperiences: [],
    cottages: [],
    totals: {},
  });

  const formatInr = (value) => `\u20B9${Number(value || 0).toLocaleString()}`;

  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return Number.isFinite(diff) && diff > 0 ? diff : 1;
  };

  const toMonthDay = (dateValue) => {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "";
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${mm}-${dd}`;
  };

  const isInMonthDayRange = (monthDay, from, to) => {
    if (!monthDay || !from || !to) return false;
    if (from <= to) return monthDay >= from && monthDay <= to;
    return monthDay >= from || monthDay <= to;
  };

  const getBookingName = (booking) => {
    if (!booking || typeof booking !== "object") return "Cottage";

    if (typeof booking.cottage === "string" && booking.cottage.trim()) {
      return booking.cottage.trim();
    }
    if (typeof booking.cottageName === "string" && booking.cottageName.trim()) {
      return booking.cottageName.trim();
    }
    if (booking.cottage && typeof booking.cottage === "object") {
      const nestedName = booking.cottage.name || booking.cottage.title;
      if (typeof nestedName === "string" && nestedName.trim()) return nestedName.trim();
    }
    if (Array.isArray(booking.cottages) && booking.cottages.length > 0) {
      const names = booking.cottages
        .map((item) => {
          if (typeof item === "string") return item.trim();
          if (item && typeof item === "object") return String(item.name || item.title || "").trim();
          return "";
        })
        .filter(Boolean);
      if (names.length > 0) return names.join(", ");
    }

    return "Cottage";
  };

  const getBookingLabel = (booking) => {
    const cottageName = getBookingName(booking);
    const checkInText = booking?.checkIn ? new Date(booking.checkIn).toLocaleDateString() : "No Date";
    const checkOutText = booking?.checkOut ? new Date(booking.checkOut).toLocaleDateString() : "No Date";
    return `${cottageName} (${checkInText} - ${checkOutText})`;
  };

  const getBookingValue = (booking, idx = 0) => {
    if (!booking || typeof booking !== "object") return `booking-${idx}`;
    return String(booking._id || booking.id || `${getBookingLabel(booking)}-${idx}`);
  };

  const bookingOptions = useMemo(() => {
    return bookings.map((booking, idx) => ({
      value: getBookingValue(booking, idx),
      label: getBookingLabel(booking),
    }));
  }, [bookings]);

  const fixedCottageOptions = useMemo(() => {
    return FIXED_COTTAGES.map((name) => {
      return {
        value: `cottage:${name}`,
        label: name,
      };
    });
  }, []);

  useEffect(() => {
    const summary = JSON.parse(localStorage.getItem("selectedPackageSummary") || "{}");
    setSelectedSummary({
      travelPackages: Array.isArray(summary.travelPackages) ? summary.travelPackages : [],
      addons: Array.isArray(summary.addons) ? summary.addons : [],
      nearbySpots: Array.isArray(summary.nearbySpots) ? summary.nearbySpots : [],
      travelExperiences: Array.isArray(summary.travelExperiences) ? summary.travelExperiences : [],
      cottages: Array.isArray(summary.cottages) ? summary.cottages : [],
      totals: summary?.totals || {},
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchBookings = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail") || "";
        const res = await API.get("/bookings", { params: { email: userEmail } });
        const list = Array.isArray(res.data) ? res.data : [];
        setBookings(list);

        if (list.length > 0) {
          const first = list[0];
          setSelectedBooking(getBookingValue(first, 0));
          if (first.totalAmount) setAmount(String(first.totalAmount));
        } else {
          setSelectedBooking(`cottage:${FIXED_COTTAGES[0]}`);
        }
      } catch (err) {
        setBookings([]);
        setSelectedBooking(`cottage:${FIXED_COTTAGES[0]}`);
      }
    };

    fetchBookings();
  }, []);

  const parsedAmount = Number(amount);
  const isAmountValid = Number.isFinite(parsedAmount) && parsedAmount > 0;
  const isUpiValid = upiIdRegex.test(upiId);
  const canProceed = isAmountValid && isUpiValid;

  const upiLink = useMemo(() => {
    if (!canProceed) return "#";
    return `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(upiName)}&am=${parsedAmount}&cu=INR`;
  }, [canProceed, parsedAmount, upiId, upiName]);

  const qrImage = useMemo(() => {
    if (!canProceed) return "";
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiLink)}`;
  }, [canProceed, upiLink]);

  const persistPayments = (next) => {
    setPayments(next);
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(next));
  };

  const makeTxId = () => `TXN${Date.now()}${Math.floor(Math.random() * 900 + 100)}`;

  const selectedBookingLabel = useMemo(() => {
    if (selectedBooking.startsWith("cottage:")) {
      return selectedBooking.replace("cottage:", "");
    }
    const matched = bookingOptions.find((item) => item.value === selectedBooking);
    return matched?.label || "General Payment";
  }, [bookingOptions, selectedBooking]);

  const selectedBookingRecord = useMemo(() => {
    const idx = bookings.findIndex((booking, i) => getBookingValue(booking, i) === selectedBooking);
    return idx >= 0 ? bookings[idx] : null;
  }, [bookings, selectedBooking]);

  const pricingDetails = useMemo(() => {
    const fallbackName = selectedBooking.startsWith("cottage:")
      ? selectedBooking.replace("cottage:", "")
      : "";
    const cottageName = selectedBookingRecord ? getBookingName(selectedBookingRecord) : fallbackName;
    const nightlyRateFromSummary = selectedSummary.cottages.find(
      (item) => String(item?.name || "").trim().toLowerCase() === String(cottageName).trim().toLowerCase()
    )?.price;
    const nightlyRate = Number(
      nightlyRateFromSummary || COTTAGE_BASE_RATES[cottageName] || selectedSummary?.totals?.cottagesTotal || 0
    );
    const nights = selectedBookingRecord
      ? calculateNights(selectedBookingRecord?.checkIn, selectedBookingRecord?.checkOut)
      : 1;
    const cottageBaseTotal = nightlyRate * nights;
    const monthDay = toMonthDay(selectedBookingRecord?.checkIn);
    const matchingDateDiscount = SPECIAL_DATE_DISCOUNTS.find(
      (rule) =>
        isInMonthDayRange(monthDay, rule.from, rule.to) &&
        rule.cottages.some((name) => name.toLowerCase() === String(cottageName).toLowerCase())
    );
    const dateDiscountPercent = Number(matchingDateDiscount?.percent || 0);
    const dateDiscountAmount = Math.round((cottageBaseTotal * dateDiscountPercent) / 100);
    const packageTotal = Number(selectedSummary?.totals?.packagesTotal || 0);
    const addonTotal = Number(selectedSummary?.totals?.addonsTotal || 0);
    const spotsTotal = Number(selectedSummary?.totals?.spotsTotal || 0);
    const experiencesTotal = Number(selectedSummary?.totals?.experiencesTotal || 0);
    const estimatedTotal =
      cottageBaseTotal - dateDiscountAmount + packageTotal + addonTotal + spotsTotal + experiencesTotal;
    const bookingTotalAmount = Number(selectedBookingRecord?.totalAmount || 0);
    const finalAmount = bookingTotalAmount > 0 ? bookingTotalAmount : Math.max(estimatedTotal, 0);
    const bookedPackages = Array.isArray(selectedBookingRecord?.packages)
      ? selectedBookingRecord.packages
      : selectedSummary.travelPackages.map((item) => item?.name).filter(Boolean);
    const bookedAddons = Array.isArray(selectedBookingRecord?.addons)
      ? selectedBookingRecord.addons
      : selectedSummary.addons.map((item) => item?.name).filter(Boolean);

    return {
      cottageName: cottageName || "Cottage",
      checkIn: selectedBookingRecord?.checkIn || "",
      checkOut: selectedBookingRecord?.checkOut || "",
      guests: Number(selectedBookingRecord?.guests || 1),
      nights,
      nightlyRate,
      cottageBaseTotal,
      dateDiscountLabel: matchingDateDiscount?.label || "",
      dateDiscountPercent,
      dateDiscountAmount,
      packageTotal,
      addonTotal,
      spotsTotal,
      experiencesTotal,
      bookingTotalAmount,
      finalAmount,
      bookedPackages,
      bookedAddons,
      hasBooking: Boolean(selectedBookingRecord),
    };
  }, [selectedBooking, selectedBookingRecord, selectedSummary]);

  useEffect(() => {
    if (!selectedBooking) return;
    setAmount(String(Math.max(0, Math.round(Number(pricingDetails.finalAmount || 0)))));
  }, [selectedBooking, pricingDetails.finalAmount]);

  const createPaymentRecord = (status, method) => ({
    id: makeTxId(),
    method,
    amount: parsedAmount,
    bookingRef: selectedBookingLabel || "General Payment",
    status,
    createdAt: new Date().toISOString(),
    upiId,
  });

  const startPayment = (method) => {
    if (!canProceed) {
      setStatusText("Enter a valid amount and UPI ID.");
      setPayStatus("failed");
      return;
    }
    if (!selectedBooking) {
      setStatusText("Select a booking before payment.");
      setPayStatus("failed");
      return;
    }

    setPayStatus("pending");
    setStatusText("Payment in progress...");

    setTimeout(() => {
      const status = Math.random() > 0.2 ? "success" : "failed";
      const record = createPaymentRecord(status, method);
      const next = [record, ...payments];
      persistPayments(next);
      setPayStatus(status);
      setStatusText(status === "success" ? `Payment successful. Transaction ID: ${record.id}` : "Payment failed. Please retry.");
      if (status === "success") setReceipt(record);
    }, 900);
  };

  const retryPayment = (payment) => {
    const matchedIdx = bookings.findIndex((booking) => getBookingLabel(booking) === payment.bookingRef);
    if (matchedIdx >= 0) {
      setSelectedBooking(getBookingValue(bookings[matchedIdx], matchedIdx));
    } else if (FIXED_COTTAGES.includes(payment.bookingRef)) {
      setSelectedBooking(`cottage:${payment.bookingRef}`);
    }
    setAmount(String(payment.amount));
    setPayStatus("idle");
    setStatusText("Details loaded. You can retry now.");
  };

  return (
    <div className="payment-page">
      <div className="payment-header">
        <h2>Payment</h2>
        <p>Complete your payment securely.</p>
      </div>

      <div className="payment-card">
        <div className="payment-form-grid">
          <label className="payment-field">
            <span>Booking</span>
            <select value={selectedBooking} onChange={(e) => setSelectedBooking(e.target.value)}>
              <option value="">Select Booking</option>
              {fixedCottageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
              {bookingOptions.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          </label>

          <label className="payment-field">
            <span>Amount (INR)</span>
            <input type="number" min="1" value={amount} readOnly />
          </label>
        </div>

        <div className="payment-total">
          <span>Total Amount</span>
          <strong>{"\u20B9"}{isAmountValid ? parsedAmount.toLocaleString() : 0}</strong>
        </div>

        <div className="payment-breakdown">
          <h3>Booking Summary (View Only)</h3>
          <div className="summary-grid">
            <p><strong>Cottage:</strong> {pricingDetails.cottageName}</p>
            <p><strong>Guests:</strong> {pricingDetails.guests}</p>
            <p><strong>Check-in:</strong> {pricingDetails.checkIn ? new Date(pricingDetails.checkIn).toLocaleDateString() : "-"}</p>
            <p><strong>Check-out:</strong> {pricingDetails.checkOut ? new Date(pricingDetails.checkOut).toLocaleDateString() : "-"}</p>
            <p><strong>Nights:</strong> {pricingDetails.nights}</p>
            <p><strong>Rate / Night:</strong> {formatInr(pricingDetails.nightlyRate)}</p>
            <p><strong>Cottage Total:</strong> {formatInr(pricingDetails.cottageBaseTotal)}</p>
            <p><strong>Packages:</strong> {pricingDetails.bookedPackages.length ? pricingDetails.bookedPackages.join(", ") : "-"}</p>
            <p><strong>Add-ons:</strong> {pricingDetails.bookedAddons.length ? pricingDetails.bookedAddons.join(", ") : "-"}</p>
            <p><strong>Packages Total:</strong> {formatInr(pricingDetails.packageTotal)}</p>
            <p><strong>Add-ons Total:</strong> {formatInr(pricingDetails.addonTotal)}</p>
            <p><strong>Spots + Experiences:</strong> {formatInr(pricingDetails.spotsTotal + pricingDetails.experiencesTotal)}</p>
            <p>
              <strong>Date Discount:</strong>{" "}
              {pricingDetails.dateDiscountAmount > 0
                ? `${pricingDetails.dateDiscountPercent}% (${pricingDetails.dateDiscountLabel}) - ${formatInr(pricingDetails.dateDiscountAmount)}`
                : "No active special-date discount"}
            </p>
            <p><strong>Final Amount:</strong> {formatInr(pricingDetails.finalAmount)}</p>
          </div>
          <div className="edit-links">
            <button type="button" className="mini-btn" onClick={() => navigate("/user/booking")}>
              Edit Dates/Guests
            </button>
            <button type="button" className="mini-btn" onClick={() => navigate("/user/packages")}>
              Edit Packages/Add-ons
            </button>
            <button type="button" className="mini-btn" onClick={() => navigate("/user/cottage")}>
              Edit Cottage
            </button>
            <button type="button" className="mini-btn" onClick={() => navigate("/user/my-bookings")}>
              View My Bookings
            </button>
          </div>
        </div>

        <div className="payment-actions">
          <button className="pay-btn primary" onClick={() => startPayment("Card")} disabled={payStatus === "pending"}>
            Pay with Card
          </button>
          <button className="pay-btn" onClick={() => startPayment("UPI")} disabled={payStatus === "pending"}>
            Pay with UPI
          </button>
          <a className={`pay-btn ${!canProceed ? "disabled-link" : ""}`} href={upiLink}>
            Open UPI App
          </a>
        </div>

        <div className="qr-box">
          <h3>Scan QR to Pay</h3>
          {canProceed ? <img src={qrImage} alt="UPI Payment QR Code" className="qr-image" /> : <p className="invalid-note">Enter valid amount to generate QR code.</p>}
          <p className="upi-id">
            UPI ID: <strong>{upiId}</strong>
          </p>
        </div>

        {payStatus !== "idle" && <p className={`status-chip ${payStatus}`}>{payStatus.toUpperCase()} - {statusText}</p>}

        <p className="payment-note">Your payment is protected and encrypted.</p>
      </div>

      <div className="history-card">
        <h3>Payment History</h3>
        {payments.length === 0 ? (
          <p className="payment-note">No payments yet.</p>
        ) : (
          <div className="payment-history">
            {payments.map((payment) => (
              <div className="history-row" key={payment.id}>
                <div>
                  <p className="history-main">{payment.bookingRef} - {"\u20B9"}{Number(payment.amount || 0).toLocaleString()}</p>
                  <p className="history-sub">{new Date(payment.createdAt).toLocaleString()} - {payment.id}</p>
                </div>
                <div className="history-actions">
                  <span className={`status-tag ${payment.status}`}>{payment.status}</span>
                  {payment.status === "success" ? (
                    <button className="mini-btn" onClick={() => setReceipt(payment)}>
                      Receipt
                    </button>
                  ) : (
                    <button className="mini-btn" onClick={() => retryPayment(payment)}>
                      Retry
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {receipt && (
        <div className="receipt-overlay" onClick={() => setReceipt(null)}>
          <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Payment Receipt</h3>
            <p><strong>Transaction ID:</strong> {receipt.id}</p>
            <p><strong>Booking:</strong> {receipt.bookingRef}</p>
            <p><strong>Amount:</strong> {"\u20B9"}{Number(receipt.amount).toLocaleString()}</p>
            <p><strong>Method:</strong> {receipt.method}</p>
            <p><strong>Date:</strong> {new Date(receipt.createdAt).toLocaleString()}</p>
            <p><strong>Status:</strong> {receipt.status}</p>
            <button className="pay-btn primary" onClick={() => setReceipt(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
