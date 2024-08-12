import React,{ useState }from 'react'
import "../assets/styles/Contact.css";

    export const Contact = () => {
        const [formData, setFormData] = useState({
          name: '',
          email: '',
          message: ''
        });
        const [errors, setErrors] = useState({});
        const [isSubmitted, setIsSubmitted] = useState(false);
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value
          });
      
          // Validate fields
          if (!value) {
            setErrors({
              ...errors,
              [name]: `${name} is required`
            });
          } else {
            setErrors({
              ...errors,
              [name]: ''
            });
      
            if (name === 'email') {
              const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailPattern.test(value)) {
                setErrors({
                  ...errors,
                  email: 'Invalid email address'
                });
              }
            }
          }
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
      
          // Validate form before submission
          const newErrors = {};
          Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
              newErrors[key] = `${key} is required`;
            }
          });
      
          if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
          }
      
          // Handle form submission logic here
          // For example, you can log the formData or send it to a server
          console.log('Form data submitted:', formData);
      
          // Indicate that the form has been successfully submitted
          setIsSubmitted(true);
        };
      
        return (
          <div className="contactFormContainer">
            {isSubmitted ? (
              <div className="successMessage">Thank you for your message!</div>
            ) : (
              <form className="contactForm" onSubmit={handleSubmit}>
                <div className="formGroup">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`formInput ${errors.name ? 'inputError' : ''}`}
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
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
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`formInput ${errors.message ? 'inputError' : ''}`}
                  ></textarea>
                  {errors.message && <span className="error">{errors.message}</span>}
                </div>
                <button type="submit" className="formButton">Submit</button>
              </form>
            )}
          </div>
        );
      };
      
      export default Contact;
    
