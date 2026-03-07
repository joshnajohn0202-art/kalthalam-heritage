import React, { useState } from 'react';
import './CottageBookingForm.css';

const CottageBookingForm = ({ cottage, onBookingSubmit }) => {
  const [formData, setFormData] = useState({
    cottageId: cottage?.id || 1,
    cottageName: cottage?.name || 'Deluxe Cottage',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 2,
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: '',
    paymentMethod: 'credit-card',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSummary, setBookingSummary] = useState(null);

  const cottagePrice = cottage?.price || 4000;

  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights(formData.checkInDate, formData.checkOutDate);
  const totalPrice = nights * cottagePrice;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.checkInDate) {
      newErrors.checkInDate = 'Check-in date is required';
    }
    if (!formData.checkOutDate) {
      newErrors.checkOutDate = 'Check-out date is required';
    }
    if (formData.checkInDate && formData.checkOutDate) {
      if (new Date(formData.checkInDate) >= new Date(formData.checkOutDate)) {
        newErrors.checkOutDate = 'Check-out date must be after check-in date';
      }
    }
    if (!formData.guestName.trim()) {
      newErrors.guestName = 'Guest name is required';
    }
    if (!formData.guestEmail.trim()) {
      newErrors.guestEmail = 'Email is required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.guestEmail)) {
      newErrors.guestEmail = 'Please enter a valid email';
    }
    if (!formData.guestPhone.trim()) {
      newErrors.guestPhone = 'Phone number is required';
    }
    if (formData.numberOfGuests < 1) {
      newErrors.numberOfGuests = 'At least 1 guest is required';
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to terms and conditions';
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleViewSummary = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setBookingSummary({
        cottageName: formData.cottageName,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        nights: nights,
        numberOfGuests: formData.numberOfGuests,
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        guestPhone: formData.guestPhone,
        pricePerNight: cottagePrice,
        totalPrice: totalPrice,
        specialRequests: formData.specialRequests || 'None',
        paymentMethod: formData.paymentMethod
      });
    } else {
      setErrors(newErrors);
    }
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onBookingSubmit) {
        onBookingSubmit(bookingSummary);
      }
      
      // Reset form
      setFormData({
        cottageId: cottage?.id || 1,
        cottageName: cottage?.name || 'Deluxe Cottage',
        checkInDate: '',
        checkOutDate: '',
        numberOfGuests: 2,
        guestName: '',
        guestEmail: '',
        guestPhone: '',
        specialRequests: '',
        paymentMethod: 'credit-card',
        agreeTerms: false
      });
      setBookingSummary(null);
      alert('Booking confirmed successfully!');
    } catch (error) {
      alert('Error confirming booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setBookingSummary(null);
    setErrors({});
  };

  if (bookingSummary) {
    return (
      <div className="booking-container">
        <div className="booking-summary-container">
          <h2 className="summary-title">📋 Booking Summary</h2>
          
          <div className="summary-card">
            <div className="summary-section">
              <h3>Cottage Details</h3>
              <div className="summary-item">
                <span className="summary-label">Cottage Name:</span>
                <span className="summary-value">{bookingSummary.cottageName}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Price per Night:</span>
                <span className="summary-value">₹{bookingSummary.pricePerNight.toLocaleString()}</span>
              </div>
            </div>

            <div className="summary-section">
              <h3>Dates & Duration</h3>
              <div className="summary-item">
                <span className="summary-label">Check-in Date:</span>
                <span className="summary-value">{new Date(bookingSummary.checkInDate).toLocaleDateString()}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Check-out Date:</span>
                <span className="summary-value">{new Date(bookingSummary.checkOutDate).toLocaleDateString()}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Duration:</span>
                <span className="summary-value">{bookingSummary.nights} nights</span>
              </div>
            </div>

            <div className="summary-section">
              <h3>Guest Information</h3>
              <div className="summary-item">
                <span className="summary-label">Guest Name:</span>
                <span className="summary-value">{bookingSummary.guestName}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Email:</span>
                <span className="summary-value">{bookingSummary.guestEmail}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Phone:</span>
                <span className="summary-value">{bookingSummary.guestPhone}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Number of Guests:</span>
                <span className="summary-value">{bookingSummary.numberOfGuests}</span>
              </div>
            </div>

            {bookingSummary.specialRequests !== 'None' && (
              <div className="summary-section">
                <h3>Special Requests</h3>
                <p>{bookingSummary.specialRequests}</p>
              </div>
            )}

            <div className="summary-section">
              <h3>Payment Method</h3>
              <div className="summary-item">
                <span className="summary-label">Method:</span>
                <span className="summary-value">
                  {bookingSummary.paymentMethod === 'credit-card' ? '💳 Credit Card' : 
                   bookingSummary.paymentMethod === 'debit-card' ? '💳 Debit Card' :
                   bookingSummary.paymentMethod === 'upi' ? '📱 UPI' : '🏦 Bank Transfer'}
                </span>
              </div>
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>Base Price ({bookingSummary.nights} nights × ₹{bookingSummary.pricePerNight}):</span>
                <span>₹{bookingSummary.totalPrice.toLocaleString()}</span>
              </div>
              <div className="price-row">
                <span>Taxes & Fees (10%):</span>
                <span>₹{Math.round(bookingSummary.totalPrice * 0.1).toLocaleString()}</span>
              </div>
              <div className="price-row total">
                <span>Total Amount:</span>
                <span>₹{(bookingSummary.totalPrice + Math.round(bookingSummary.totalPrice * 0.1)).toLocaleString()}</span>
              </div>
            </div>

            <div className="summary-actions">
              <button className="btn-back" onClick={handleBack}>Back</button>
              <button 
                className="btn-confirm" 
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Confirm & Proceed to Payment'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <div className="booking-form-container">
        <h2 className="form-title">🏠 Book Your Cottage</h2>
        <p className="form-subtitle">Fill in your details to complete the booking</p>

        <form className="booking-form">
          {/* Cottage Selection */}
          <fieldset className="form-fieldset">
            <legend className="fieldset-title">Cottage Details</legend>
            
            <div className="form-group">
              <label htmlFor="cottageName">Selected Cottage</label>
              <input
                type="text"
                id="cottageName"
                name="cottageName"
                value={formData.cottageName}
                disabled
                className="form-input disabled"
              />
            </div>

            <div className="form-group">
              <label htmlFor="numberOfGuests">Number of Guests</label>
              <input
                type="number"
                id="numberOfGuests"
                name="numberOfGuests"
                min="1"
                max="10"
                value={formData.numberOfGuests}
                onChange={handleInputChange}
                className={`form-input ${errors.numberOfGuests ? 'error' : ''}`}
              />
              {errors.numberOfGuests && <span className="error-text">{errors.numberOfGuests}</span>}
            </div>
          </fieldset>

          {/* Dates */}
          <fieldset className="form-fieldset">
            <legend className="fieldset-title">📅 Booking Dates</legend>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="checkInDate">Check-in Date</label>
                <input
                  type="date"
                  id="checkInDate"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleInputChange}
                  className={`form-input ${errors.checkInDate ? 'error' : ''}`}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.checkInDate && <span className="error-text">{errors.checkInDate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="checkOutDate">Check-out Date</label>
                <input
                  type="date"
                  id="checkOutDate"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleInputChange}
                  className={`form-input ${errors.checkOutDate ? 'error' : ''}`}
                  min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                />
                {errors.checkOutDate && <span className="error-text">{errors.checkOutDate}</span>}
              </div>
            </div>

            {nights > 0 && (
              <div className="nights-info">
                ✓ {nights} night{nights !== 1 ? 's' : ''} selected
              </div>
            )}
          </fieldset>

          {/* Guest Information */}
          <fieldset className="form-fieldset">
            <legend className="fieldset-title">👤 Guest Information</legend>
            
            <div className="form-group">
              <label htmlFor="guestName">Full Name</label>
              <input
                type="text"
                id="guestName"
                name="guestName"
                placeholder="Enter your full name"
                value={formData.guestName}
                onChange={handleInputChange}
                className={`form-input ${errors.guestName ? 'error' : ''}`}
              />
              {errors.guestName && <span className="error-text">{errors.guestName}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="guestEmail">Email Address</label>
                <input
                  type="email"
                  id="guestEmail"
                  name="guestEmail"
                  placeholder="Enter your email"
                  value={formData.guestEmail}
                  onChange={handleInputChange}
                  className={`form-input ${errors.guestEmail ? 'error' : ''}`}
                />
                {errors.guestEmail && <span className="error-text">{errors.guestEmail}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="guestPhone">Phone Number</label>
                <input
                  type="tel"
                  id="guestPhone"
                  name="guestPhone"
                  placeholder="Enter your phone number"
                  value={formData.guestPhone}
                  onChange={handleInputChange}
                  className={`form-input ${errors.guestPhone ? 'error' : ''}`}
                />
                {errors.guestPhone && <span className="error-text">{errors.guestPhone}</span>}
              </div>
            </div>
          </fieldset>

          {/* Special Requests */}
          <fieldset className="form-fieldset">
            <legend className="fieldset-title">💬 Special Requests (Optional)</legend>
            
            <div className="form-group">
              <label htmlFor="specialRequests">Any special requests or preferences?</label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                placeholder="E.g., Room with a view, Extra beds, Pick-up service, etc."
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows="4"
                className="form-textarea"
              ></textarea>
            </div>
          </fieldset>

          {/* Payment Method */}
          <fieldset className="form-fieldset">
            <legend className="fieldset-title">💳 Payment Method</legend>
            
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={formData.paymentMethod === 'credit-card'}
                  onChange={handleInputChange}
                />
                <span>💳 Credit Card</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="debit-card"
                  checked={formData.paymentMethod === 'debit-card'}
                  onChange={handleInputChange}
                />
                <span>💳 Debit Card</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleInputChange}
                />
                <span>📱 UPI</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank-transfer"
                  checked={formData.paymentMethod === 'bank-transfer'}
                  onChange={handleInputChange}
                />
                <span>🏦 Bank Transfer</span>
              </label>
            </div>
          </fieldset>

          {/* Terms & Conditions */}
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className={errors.agreeTerms ? 'error' : ''}
              />
              <span>I agree to the Terms & Conditions and Privacy Policy</span>
            </label>
            {errors.agreeTerms && <span className="error-text">{errors.agreeTerms}</span>}
          </div>

          {/* Price Estimate */}
          {nights > 0 && (
            <div className="price-estimate">
              <h3>Price Estimate</h3>
              <div className="estimate-row">
                <span>₹{cottagePrice} × {nights} night{nights !== 1 ? 's' : ''}</span>
                <span className="estimate-total">₹{totalPrice.toLocaleString()}</span>
              </div>
              <p className="estimate-note">Final amount will include taxes and applicable fees</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="button"
            className="btn-submit"
            onClick={handleViewSummary}
          >
            View Booking Summary
          </button>
        </form>
      </div>
    </div>
  );
};

export default CottageBookingForm;
