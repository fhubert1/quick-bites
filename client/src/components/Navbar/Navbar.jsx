// import React from "react";
import styles from './Navbar.module.css';
import {Link} from 'react-router-dom';

 export const Navbar = () => {

    return (
        <div className={styles.navbar}>
        <nav>
          <ul className={styles.nav}>
            <li>
                <Link to='/' >
                Home
                </Link>
            </li>
            <li>
               <Link to="/menu" className={styles.navlink}>
                Menu
                </Link>
            </li>
        <li>
           <Link to="/contact">
            Contact Us
            </Link>
        </li>
        <li>
            <Link to="/signup">
            SignUp!
           </Link>
        </li>
        <li>
            <Link to="/login">
            Login!
            </Link>
        </li>
          </ul>
        </nav>
      </div>

  );
};

export default Navbar;
