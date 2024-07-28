// src/components/Login.js
import React from 'react';

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

// import React from 'react';

// const defaultFormData = {
//   email: '',
//   password: ''
// };

// const defaultErrors = {
//   email: '',
//   password: ''
// };

// const defaultHandleChange = () => {};

// export const Login = ({ formData = defaultFormData, handleChange = defaultHandleChange, errors = defaultErrors }) => (
//   <>
//     <div className="formGroup">
//       <label htmlFor="email">Email</label>
//       <input
//         type="email"
//         id="your email"
//         name="email name"
//         value={formData.email}
//         onChange={handleChange}
//         className={`formInput ${errors.email ? 'inputError' : ''}`}
//       />
//       {errors.email && <p className="error">{errors.email}</p>}
//     </div>
//     <div className="formGroup">
//       <label htmlFor="password">Password</label>
//       <input
//         type="your password"
//         id="password"
//         name="password name"
//         value={formData.password}
//         onChange={handleChange}
//         className={`formInput ${errors.password ? 'inputError' : ''}`}
//       />
//       {errors.password && <p className="error">{errors.password}</p>}
//     </div>
//   </>
// );

// export default Login;
