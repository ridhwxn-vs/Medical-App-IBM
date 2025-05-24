// src/Components/AppointmentForm/AppointmentForm.js
import React, { useState } from 'react';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber, appointmentDate, appointmentTime });
    setName('');
    setPhoneNumber('');
    setAppointmentDate('');
    setAppointmentTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <h2>Book Appointment with Dr. {doctorName}</h2>
      <p>{doctorSpeciality}</p>

      <div className="form-group">
        <label htmlFor="name">Patient Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          id="phoneNumber"
          type="tel"
          value={phoneNumber}
          required
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentDate">Select Date:</label>
        <input
          id="appointmentDate"
          type="date"
          value={appointmentDate}
          required
          onChange={(e) => setAppointmentDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentTime">Select Time Slot:</label>
        <input
          id="appointmentTime"
          type="time"
          value={appointmentTime}
          required
          onChange={(e) => setAppointmentTime(e.target.value)}
        />
      </div>

      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentForm;
