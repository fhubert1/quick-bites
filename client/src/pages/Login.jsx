import React from 'react';
import "../assets/styles/auth.css";

export const Login = ({ formData, handleChange, errors }) => (
  <>
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
      {errors.email && <p className="error">{errors.email}</p>}
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

export default Login;