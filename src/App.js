import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Landing_page from './Components/Landing_Page/LandingPage';
import Login from './Components/Login/Login';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import BookingConsultation from './Components/BookingConsultation';


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<Landing_page />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booking-consultation" element={<BookingConsultation />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
