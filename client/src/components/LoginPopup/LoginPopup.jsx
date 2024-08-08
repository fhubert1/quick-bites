import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER } from '../../../utils/mutations';
import Auth from '../../../utils/auth';
import './LoginPopup.css'; 

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login");
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: ''
    });
    const [login, { error: loginError }] = useMutation(LOGIN_USER);
    const [addUser, { error: signupError }] = useMutation(ADD_USER);

    const handleClose = () => {
        setShowLogin(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            if (currState === "Login") {
                const { data } = await login({
                    variables: { ...formData },
                });
                Auth.login(data.login.token);
            } else if (currState === "Sign Up") {
                const { data } = await addUser({
                    variables: { ...formData },
                });
                Auth.login(data.addUser.token);
            }
            setFormData({
                userName: '',
                email: '',
                password: ''
            });
        } catch (err) {
            console.error(err);
            // Optionally set an error message in the state to display to the user
        }
    };

    return (
        <div className="login-popup">
            <form className="login-popup-container" onSubmit={handleFormSubmit}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <button 
                        className="close-button" 
                        type="button" 
                        onClick={handleClose}
                    >
                        ×
                    </button>
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Your Password"
                        required
                    />
                </div>
                <button type="submit">
                    {currState === "Sign Up" ? "Create account" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms and conditions</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>}
                {loginError && <p className="error">Login failed. Please try again.</p>}
                {signupError && <p className="error">Signup failed. Please try again.</p>}
            </form>
        </div>
    );
};

export default LoginPopup;
