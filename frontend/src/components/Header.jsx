import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AssistantOutlinedIcon from '@mui/icons-material/AssistantOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function Header({ onLogout }) {
  const [showMenu, setShowMenu] = useState(false);
  const user = localStorage.getItem("currentUser");
  const loggedInUser = JSON.parse(user);

  const navigate = useNavigate();

  function handleProfileMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <div className="header-container">
      <header className="header-bar">
        <div className="left-content dashboard-container">
          <h2 className="logo-dashboard">
            Expen$e<span className="logo-text logo-text-dashboard">Tracker</span>
          </h2>
        </div>
      </header>

      <div className="search-container">
        <SearchOutlinedIcon className="search-icon" />
        <input placeholder="Search..." className="search" />
      </div>

      <div className="header-btn">
        <NotificationsOutlinedIcon className="header-icon" />
        <AssistantOutlinedIcon className="header-icon"/>
        <div className="avatar-container">
          <button type="button" className="avatar-profile" onClick={handleProfileMenu}>
            <img src="/src/assets/my-photo.jpg" alt="Profile" />
          </button>

          {showMenu ? (
            <div className="profile-menu">
              <strong>{loggedInUser?.username}</strong>
              <hr />
              <NavLink
                to="/dashboard/profile"
                className="nav-icon"
                title="Profile"
                onClick={() => setShowMenu(false)}
              >
                <ManageAccountsOutlinedIcon className="icon" /> Profile
              </NavLink>
              <button
                type="button"
                className="nav-icon logout-btn-showMenu"
                onClick={onLogout}
                title="Logout"
              >
                <LogoutOutlinedIcon className="icon" /> Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Header;
