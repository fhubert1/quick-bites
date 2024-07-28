import React, { useState } from 'react'; // Import useState from React
import '../assets/styles/Login.css'; 

const Login = ({ formData = {}, handleChange, handleSubmit, errors = {} }) => (
  <div className="authContainer">
    <form className="authForm" onSubmit={handleSubmit}>
      <div className="formGroup">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username || ''} // Provide a default value to avoid undefined issues
          onChange={handleChange} // Add the onChange handler
          className={`formInput ${errors.username ? 'inputError' : ''}`}
        />
        {errors.username && <p className="error">{errors.username}</p>}
      </div>
      <div className="formGroup">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password || ''} // Provide a default value to avoid undefined issues
          onChange={handleChange} // Add the onChange handler
          className={`formInput ${errors.password ? 'inputError' : ''}`}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <button type="submit" className="formButton">
        Login
      </button>
    </form>
  </div>
);

const Auth = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  return (
    <Login
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  );
};

export default Auth;
