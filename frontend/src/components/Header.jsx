import React from "react";
import { NavLink } from "react-router-dom";

function Header(props) {

  return (
    
    <div className="header-container">
      <header className="header-bar">
      <div className="left-content dashboard-container">
        <h2 className="logo-dashboard">Expen$e<span className="logo-text logo-text-dashboard">Tracker</span></h2>
      </div>
      </header>
     <div className="header-btn">
        <p>
          SEARCH BAR
        </p>
        <p>
          NOTIFICATION BELL
        </p>
        <p>
          AI ICON
        </p>
        <p>
          AVATAR PROFILE
        </p>
        <p>
          USER NAME
        </p>
        <p>
          super admin
        </p>
      </div>
    </div>
  );
}

export default Header;




