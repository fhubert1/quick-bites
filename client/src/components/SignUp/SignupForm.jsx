// src/components/Signup.js
import React from 'react';

const Signup = ({ formData, handleChange, errors }) => (
  <>
    <div className="formGroup">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        className={`formInput ${errors.username ? 'inputError' : ''}`}
      />
      {errors.username && <span className="error">{errors.username}</span>}
    </div>
    <div className="formGroup">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className={`formInput ${errors.email ? 'inputError' : ''}`}
      />
      {errors.email && <span className="error">{errors.email}</span>}
    </div>
    <div className="formGroup">
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className={`formInput ${errors.password ? 'inputError' : ''}`}
      />
      {errors.password && <span className="error">{errors.password}</span>}
    </div>
  </>
);

export default Signup;
