import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from './global.module.css'
function App() {
  return (
    <div>
      <div className="flex">
        <NavLink 
         to="/"
         className={({ isActive }) => 
       isActive ? styles.activeClassName : styles.navLink
        }>Home</NavLink>
        <NavLink 
         to="/history"
         className={({ isActive }) => 
       isActive ? styles.activeClassName : styles.navLink
        }>History</NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
