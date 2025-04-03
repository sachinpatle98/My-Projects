import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css"; // Create styles for sidebar

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Admin Panel</h3>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/dashboard" activeClassName="active">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" activeClassName="active">
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName="active">
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
