import React from 'react';
import '../assets/styles/SignUp.css'; 

const Signup = ({ formData = {}, handleChange, handleSubmit, errors = {} }) => (
  <div className="authContainer">
    <form className="authForm" onSubmit={handleSubmit}>
      <div className="formGroup">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username || ''} // Provide a default value to avoid undefined issues
          onChange={handleChange} // Ensure this is provided
          className={`formInput ${errors.username ? 'inputError' : ''}`}
        />
        {errors.username && <p className="error">{errors.username}</p>}
      </div>
      <div className="formGroup">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || ''} // Provide a default value to avoid undefined issues
          onChange={handleChange} // Ensure this is provided
          className={`formInput ${errors.email ? 'inputError' : ''}`}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="formGroup">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password || ''} // Provide a default value to avoid undefined issues
          onChange={handleChange} // Ensure this is provided
          className={`formInput ${errors.password ? 'inputError' : ''}`}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <button type="submit" className="formButton">
        Sign Up
      </button>
    </form>
  </div>
);

export default Signup;