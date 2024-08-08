import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../../utils/auth';
import styles from './Navbar.module.css';

export const Navbar = ({ toggleCart, setShowLogin }) => {
  if (Auth.loggedIn()) {
    return (
      <div className={styles.navbar}>
        <nav>
          <ul className={styles.nav}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to="/menu" className={styles.navlink}>Menu</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            {/* <li>
              <Link to="/OrderHistory">Order History!</Link>
            </li> */}
            <li>
              <a href="/" onClick={(e) => { e.preventDefault(); toggleCart(); }}>
                <span role="img" aria-label="cart">🛒</span>
              </a>
            </li>
            <li>
              <a href="/" onClick={() => Auth.logout()}>Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  } else {
    return (
      <div className={styles.navbar}>
        <nav>
          <ul className={styles.nav}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to="/menu" className={styles.navlink}>Menu</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <button onClick={() => setShowLogin(true)}>Sign In</button>
          </ul>
        </nav>
      </div>
    );
  }
};

export default Navbar;
