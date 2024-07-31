
// import React, { useState } from 'react';
//  import Signup from './pages/Signup'; // Adjust the path as necessary
// import '../assets/styles/auth.css'; // Adjust the path as necessary

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const validateForm = (data) => {
//     const errors = {};
//     if (!data.username && !isLogin) errors.username = 'Username is required';
//     if (!data.email) errors.email = 'Email is required';
//     if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Invalid email address';
//     if (!data.password) errors.password = 'Password is required';
//     return errors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formErrors = validateForm(formData);
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }

//     if (isLogin) {
//       // Handle login logic
//       console.log('Login data submitted:', formData);
//     } else {
//       // Handle signup logic
//       console.log('Signup data submitted:', formData);
//     }

//     setIsSubmitted(true);
//   };

//   const switchForm = () => {
//     setIsLogin(!isLogin);
//     setErrors({});
//     setFormData({
//       username: '',
//       email: '',
//       password: ''
//     });
//   };

//   return (
//     <div className="authContainer">
//       {isSubmitted ? (
//         <div className="successMessage">
//           {isLogin ? 'Login successful!' : 'Signup successful!'}
//         </div>
//       ) : (
//         <Signup
//           formData={formData}
//           handleChange={handleChange}
//           handleSubmit={handleSubmit}
//           errors={errors}
//         />
//       )}
//       <button type="button" onClick={switchForm} className="formSwitchButton">
//         {isLogin ? 'Create an account' : 'Already have an account? Login'}
//       </button>
//     </div>
//   );
// };

// export default Auth;
