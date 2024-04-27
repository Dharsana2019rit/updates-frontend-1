import React from 'react';
const Modal = ({ onClose, onSubmit, onChange, bookingDetails, email}) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    onSubmit(); // Call the onSubmit function passed from the parent component
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Book Table</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={bookingDetails.name} onChange={onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={email} onChange={onChange} disabled/>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="text" id="phone" name="phone" value={bookingDetails.phone} onChange={onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="numberOfGuests">Number of Guests:</label>
              <input
                type="number"
                id="numberOfGuests"
                name="numberOfGuests"
                value={bookingDetails.numberOfGuests}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn-primary">Book Now</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
