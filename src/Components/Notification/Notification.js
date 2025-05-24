import React, { useEffect, useState } from 'react';
import './Notification.css';  // We'll create this next

const Notification = ({ children }) => {
  // State to track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = storedDoctorData
      ? JSON.parse(localStorage.getItem(storedDoctorData.name))
      : null;

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true);  // Show notification when appointment data is present
    }
  }, []);

  // Simulate listening for cancellation: 
  // You may want to update this logic to fit your actual cancellation event
  // For example, listen to a custom event or use a state/context or props
  useEffect(() => {
    // Check appointmentData every time it changes (or on some event)
    if (appointmentData && appointmentData.status === 'cancelled') {
      setShowNotification(false);
    }
  }, [appointmentData]);

  // Close notification manually (optional)
  const handleClose = () => {
    setShowNotification(false);
  };

  return (
    <div>
      {children}

      {/* Show notification only if logged in, have appointmentData, and showNotification true */}
      {isLoggedIn && appointmentData && showNotification && (
        <div className="notification-container">
          <div className="notification-card">
            <div className="notification-header">
              <h3>Appointment Confirmed</h3>
              <button className="close-btn" onClick={handleClose}>&times;</button>
            </div>
            <p><strong>Patient:</strong> {username}</p>
            <p><strong>Doctor:</strong> {doctorData?.name}</p>
            <p><strong>Date:</strong> {appointmentData.date}</p>
            <p><strong>Time:</strong> {appointmentData.time}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
