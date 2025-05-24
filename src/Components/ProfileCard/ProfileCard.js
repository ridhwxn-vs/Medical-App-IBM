import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ name, email, phone }) => {
  return (
    <div className="profile-card">
      <h3>👤 Profile</h3>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
    </div>
  );
};

export default ProfileCard;
