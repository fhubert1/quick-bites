import React from "react";
import styles from './Navbar.module.css';
export const Navbar = () => {
    return (
        <div className={styles.navbar}>
        <nav>
          <ul className={styles.nav}>
            <li>
                Menu
            </li>
        <li>
            Contact Us
        </li>
        <li>
            SignUp!
        </li>
        <li>
            Login!
        </li>
          </ul>
        </nav>
      </div>

  );
};
