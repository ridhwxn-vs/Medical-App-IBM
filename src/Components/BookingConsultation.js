// components/BookingConsultation.js

import React, { useEffect, useState } from 'react';
import FindDoctorSearchIC from './InstantConsultationBooking/FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCard from './DoctorCard/DoctorCard';
import './InstantConsultationBooking/InstantConsultation.css'; // reuse the CSS
import { useNavigate, useSearchParams } from 'react-router-dom';

const BookingConsultation = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63') // sample doctor API
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
        if (searchParams.get('speciality')) {
          const filtered = data.filter(
            doctor =>
              doctor.speciality.toLowerCase() ===
              searchParams.get('speciality').toLowerCase()
          );
          setFilteredDoctors(filtered);
          setIsSearched(true);
        }
      })
      .catch(err => console.log(err));
  }, [searchParams]);

  const handleSearch = (searchText) => {
    if (searchText.trim() === '') {
      setFilteredDoctors([]);
      setIsSearched(false);
    } else {
      const filtered = doctors.filter(
        (doctor) =>
          doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setIsSearched(true);
    }
  };

  return (
    <center>
      <div className="searchpage-container">
        <FindDoctorSearchIC onSearch={handleSearch} />
        <div className="search-results-container">
          {isSearched && (
            <center>
              <h2>{filteredDoctors.length} doctors are available</h2>
              <h3>Book appointments with minimum wait-time & verified doctor details</h3>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCard className="doctorcard" {...doctor} key={doctor.name} />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </center>
          )}
        </div>
      </div>
    </center>
  );
};

export default BookingConsultation;
