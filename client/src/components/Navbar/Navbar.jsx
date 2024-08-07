// import React from "react";
import styles from './Navbar.module.css';
import {Link} from 'react-router-dom';
import Auth from "../../../utils/auth";

 export const Navbar = ({setShowLogin}) => {
    if (Auth.loggedIn()) {
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
            <Link to="/OrderHistory">
            Order History!
           </Link>
        </li>
        <li>
            <Link to="/Cart">
            Cart
           </Link>
        </li>
        <li>
        <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
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
        <button onClick={()=>setShowLogin(true)}>sign in</button>
        
          </ul>
        </nav>
      </div>

  );
};
};

export default Navbar;
