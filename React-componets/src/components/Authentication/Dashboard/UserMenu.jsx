import React, { useEffect, useState, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import { getProfileData } from "../../../apiServices/apiService";

const UserMenu = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState("");
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const userName = localStorage.getItem("name");
    const googleUserName = localStorage.getItem("fullname");

    let result = userName ? userName.split(" ")[0] : googleUserName?.split(" ")[0];
    setName(result);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOpen = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token is missing!");
      return;
    }

    try {
      const response = await getProfileData(token);
      if (response.statusCode === 200 && response.payload) {
        setProfileData(response.payload);
        setOpen(true);
      } else {
        console.log("Invalid session data format");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <div className="d-flex align-items-center position-relative" ref={dropdownRef}>
      <div
        className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center"
        style={{ width: "40px", height: "40px", cursor: "pointer", fontSize: "18px" }}
        onClick={toggleDropdown}
      >
        {name?.charAt(0)?.toUpperCase()}
      </div>

      <span className="ms-2 fw-bold text-dark" style={{ cursor: "pointer" }} onClick={toggleDropdown}>
        {name}
      </span>

      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "57px",
            right: "0",
            zIndex: "1050",
            backgroundColor: "white",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            minWidth: "210px",
          }}
        >
          <Dropdown.Menu show align="end">
            <Dropdown.Item onClick={handleOpen}>
              <i className="fa fa-user" aria-hidden="true" style={{ paddingRight: "5px" }}></i>
              View Profile
            </Dropdown.Item>
            <Dropdown.Item href="#">
              <i className="fa fa-tachometer" aria-hidden="true" style={{ paddingRight: "5px" }}></i>
              Reports and Dashboard
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate("/project/1/auth/login-session")}>
              <i className="fa fa-sign-in" aria-hidden="true" style={{ paddingRight: "5px" }}></i>
              Login Sessions
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>
              <i className="fa fa-sign-out" aria-hidden="true" style={{ paddingRight: "5px" }}></i>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </div>
      )}

      {/* Pass Profile Data to Modal */}
      {open && <Profile profileData={profileData} closeModal={() => setOpen(false)} />}
    </div>
  );
};

export default UserMenu;
