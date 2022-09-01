import React from "react";
import "./App.css";
import { NavLink, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <div>
        <NavLink style={({ isActive }) => {
          return {
            display: "block",
            margin: "1rem 0",
            color: isActive ? "gray" : "",
            textDecoration: isActive? "none" : "underline"
          };
        }} to="/">Home</NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
