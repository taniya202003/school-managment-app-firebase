import React, { useContext, useEffect, useState } from "react";
import "../../assets/adminPortal.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { ContextProvider } from "../../context/Context";
import { AdminDashboard } from "../../pages/AdminDashboard";
import { TeachersData } from "../../pages/TeachersData";
import { StudentsData } from "../../pages/StudentsData";
import { BlockedUsers } from "../../pages/BlockedUsers";
import { toast } from "react-toastify";

export const AdminPortal = () => {
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false);
  const { activeTab, setActiveTab, handleLogOut, fetchUsersByRole } = useContext(ContextProvider);

  useEffect(() => {
    let role;
    if (activeTab) {
      if (activeTab === "Dashboard") {
        role = "ADMIN";
      } else if (activeTab === "Teachers") {
        role = "TEACHER";
      } else {
        role = "STUDENT";
      }
    }
    fetchUsersByRole(role);
  }, []);
  
  return (
    <div className="adminPortal-container">
      <h1 className="adminPortal-h1">Admin Portal</h1>
      <div className="adminPortal-sidebarAndcontent">
        {/* Custom Sidebar */}
        <div className="adminPortal-sidebar">
          <nav className="sidebar-nav">
            <ul className="sidebar-list">
              <li  className={activeTab === "Dashboard" ? "active" : ""}  
                onClick={() => {
                  setActiveTab("Dashboard");
                  fetchUsersByRole("ADMIN");
                }}
              >
                Dashboard
              </li>

              <li className="sidebar-submenu">
                <span
                  className="dropdown-toggle"
                  onClick={() => setIsManageUsersOpen(!isManageUsersOpen)}
                >
                  <p
                    style={{
                      margin: "0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    Manage Users
                    <span>
                      <IoMdArrowDropdown />
                    </span>
                  </p>
                </span>
                <ul
                  className={`submenu-list ${isManageUsersOpen ? "open" : ""}`}
                >
                  <li
                    onClick={() => {
                      setActiveTab("Teachers");
                      fetchUsersByRole("TEACHER");
                    }}
                    className={activeTab === "Teachers" ? "active" : ""}
                  >
                    Teachers
                  </li>
                  <li
                    onClick={() => {
                      setActiveTab("Students");
                      fetchUsersByRole("STUDENT");
                    }}
                    className={activeTab === "Students" ? "active" : ""}
                  >
                    Students
                  </li>
                </ul>
              </li>

              <li className={activeTab === "BlockedUser" ? "active" : ""}
                onClick={() => {
                  setActiveTab("BlockedUser");
                }}
               
              >
                Blocked Users
              </li>

              <li onClick={()=>handleLogOut(toast.success("User has been loged out"))}>Logout</li>
            </ul>
          </nav>

          <button className="adminPortal-logoutBtn" onClick={handleLogOut}>
            Logout / Sign-out
          </button>
        </div>

        <div className="adminPortal-content">
          {activeTab === "Dashboard" && (
            <div className="adminPortal-profile-div">
              <h2 className="adminPortal-h2">Admin's Profile</h2>
              <AdminDashboard />
            </div>
          )}
          {activeTab === "Teachers" && (
            <div className="adminPortal-profiles ">
              <h2 className="adminPortal-h2">Teacher's Profiles</h2>
              <TeachersData />
            </div>  
          )}

          {activeTab === "Students" && (
            <div className="adminPortal-profiles">
              <h2 className="adminPortal-h2">Student's Profiles</h2>
              <StudentsData />
            </div>
          )}

          {activeTab === "BlockedUser" && (
            <div className="adminPortal-profiles">
              <BlockedUsers />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


