import { useState } from 'react';
import '../assets/styles/SignUp.css'; 
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: '', 
    email: '', 
    password: ''
  })
  const [addUser] = useMutation(ADD_USER);

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle the submition of form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const mutationResponse = await addUser({
        variables: {
          userName: formData.userName,
          email: formData.email,
          password: formData.password
        },
      });
      console.log("Mutation response:" + mutationResponse);
      const token = mutationResponse.data.addUser.token
     Auth.login(token);
    
    } catch (err) {
      console.log("string");
      console.log(err);
      console.error(err);
    }
  };

  return(
    <div className="authContainer">
    <form className="authForm" onSubmit={handleFormSubmit}>
      <div className="formGroup">
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName || ''} // Provide a default value to avoid undefined issues
          onChange={handleChange} // Ensure this is provided
          className="formInput"
          />     
      </div>
      <div className="formGroup">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || ''} // Provide a default value to avoid undefined issues
          onChange={handleChange} // Ensure this is provided
          className="formInput"
          />   
      </div>
      <div className="formGroup">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password || ''} // Provide a default value to avoid undefined issues
          onChange={handleChange} // Ensure this is provided
          className="formInput"
          />   
      </div>
      <button type="submit" className="formButton">
        Sign Up
      </button>
    </form>
  </div>
);
};
  
export default Signup;