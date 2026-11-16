import React from "react";
function DashboardOverview() {
  const user = localStorage.getItem("currentUser");
  const loggedInUser = JSON.parse(user)
  console.log(loggedInUser.username);

  return (
    <div className="overview-container">
      <h2>Dashboard Overview</h2>
      <p>Welcome back <strong>{loggedInUser.username}</strong>! Select an option above or view your recent activity here.</p>
    </div>
  );
}

export default DashboardOverview;
