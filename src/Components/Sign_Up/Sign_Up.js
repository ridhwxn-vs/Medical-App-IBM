import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
  // Use separate state for each input field (per instructions)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [username, setUsername] = useState(''); // for showing name extracted from email
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email';
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const formData = { name, phone, email, password };
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const json = await response.json();

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("email", email);

        // Extract username from email before @
        const extractedUsername = email.split('@')[0];
        setUsername(extractedUsername);

        navigate("/");
        window.location.reload();
      } else {
        setApiError(typeof json.error === 'string' ? json.error : 'Registration failed.');
      }
    } catch (error) {
      setApiError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
          {/* Display username extracted from email if available */}
          {username && <p>Welcome, {username}!</p>}
        </div>
        <div className="signup-text1" style={{ textAlign: 'left' }}>
          Already a member? <span><Link to="/login" style={{ color: '#2190FF' }}>Login</Link></span>
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            {apiError && <p className="error-text" style={{ color: 'red' }}>{apiError}</p>}

            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2 mr-1">Submit</button>
              <button
                type="reset"
                className="btn btn-danger mb-2"
                onClick={() => {
                  setName('');
                  setPhone('');
                  setEmail('');
                  setPassword('');
                  setErrors({});
                  setApiError('');
                  setUsername('');
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
