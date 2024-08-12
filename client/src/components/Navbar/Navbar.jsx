import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Auth from "../../../utils/auth";
import styles from "./Navbar.module.css";

export const Navbar = ({ toggleCart, setShowLogin }) => {
  return (
    <div className={styles.navbar}>
      <nav>
        <ul className={styles.nav}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/menu" className={styles.navlink}>
              Menu
            </Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <button onClick={toggleCart} className={styles.cartButton}>
              <span role="img" aria-label="cart">
                🛒
              </span>
            </button>
          </li>
          <li>
            {Auth.loggedIn() ? (
              <a href="/" onClick={() => Auth.logout()}>
                Logout
              </a>
            ) : (
              <button onClick={() => setShowLogin(true)}>Sign In</button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

// Define PropTypes for Navbar
Navbar.propTypes = {
  toggleCart: PropTypes.func.isRequired,
  setShowLogin: PropTypes.func.isRequired,
};

export default Navbar;
