import React from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header";

function DashboardLayout({notification, contextData}) {
    return (
        <>
            <Header setInputData={contextData.setInputData} />

            <main className="dashboard-content">
                {/*React Router passes shared states/methods to children here */}
                <Outlet context={contextData}/>
            </main>

            {notification && (
                <div className="toast-notifications">
                    {notification}
                </div>
            )}
        </>
    );
}

export default DashboardLayout;