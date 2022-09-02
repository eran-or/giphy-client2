import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <div>
        <NavLink style={({ isActive }) => {
          return {
            display: "block",
            margin: "1.1rem",
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
