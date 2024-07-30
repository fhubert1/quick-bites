import React, { useState } from 'react';
import '../assets/styles/Login.css'; 
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [ login, {error, data }] = useMutation(LOGIN_USER);
  
  // Update state based on form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Handle the submition of form
  const handleSubmit =  async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const { data } = await login({
        variables: {...formData},
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e)
    }

  //Clear form
  setFormData({
    email: '',
    password: '',
  });
  };
    
  return(
    <div className="authContainer">
      <form className="authForm" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''} // Provide a default value to avoid undefined issues
            onChange={handleChange} // Add the onChange handler
          />  
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password || ''} // Provide a default value to avoid undefined issues
            onChange={handleChange} // Add the onChange handler
          />
        </div>
        <button type="submit" className="formButton">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
