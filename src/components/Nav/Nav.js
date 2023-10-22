import React, { useState } from "react";
import styles from "./Nav.module.css";
import logo from "../images/logo.png";

const Nav = () => {
  const [showNavItems, setShowNavItems] = useState(false);

  const toggleNavItems = () => {
    setShowNavItems(!showNavItems);
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.logo}>
        <img src={logo} alt="koinX logo" />
        <div className={styles.menuIcon} onClick={toggleNavItems}>
          ☰
        </div>
      </div>

      <div className={`${styles.navItems} ${showNavItems ? styles.show : ""}`}>
        <h4>Features</h4>
        <h4>Exchanges</h4>
        <h4>How it Works?</h4>
        <h4>Blog</h4>
        <h4>About us</h4>
        <button className={styles.signInButton}>Sign in</button>
      </div>
    </div>
  );
};

export default Nav;
