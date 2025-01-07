import React, { useContext, useEffect, useState } from "react";
import "../../assets/teachersPortal.css";
import { ContextProvider } from "../../context/Context";
import { IoMdArrowDropdown } from "react-icons/io";
import { EnrolledStudents } from "../teacher-and-students-sidebar/EnrolledStudents";
import { SendInvitations } from "../teacher-and-students-sidebar/SendInvitations";
import { Videos } from "../teacher-and-students-sidebar/Videos";
import { BlockedStudents } from "../teacher-and-students-sidebar/BlockedStudents";
import { TeacherAndStudentDash } from "../teacher-and-students-sidebar/TeacherAndStudentDash";
import { AcceptRequests } from "../teacher-and-students-sidebar/AcceptRequests";
import { toast } from "react-toastify";

export const TeacherPortal = () => {
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false);
  const {
    activeTab,
    setActiveTab,
    handleLogOut,
    fetchCurrentUser,
    fetchUsersByRole,
  } = useContext(ContextProvider);

  useEffect(() => {
    fetchUsersByRole("STUDENT");
    fetchCurrentUser();
  }, []);

  return (
    <div className="teachersPortal-container">
      <h1 className="teachersPortal-h1">Teachers Portal</h1>
      <div className="teachersPortal-sidebarAndcontent">
        {/* Custom Sidebar */}
        <div className="teachersPortal-sidebar">
          <nav className="sidebar-nav">
            <ul className="sidebar-list">
              <li
                className={activeTab === "Dashboard" ? "active" : ""}
                onClick={() => {
                  setActiveTab("Dashboard");
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
                    Students
                    <span>
                      <IoMdArrowDropdown />
                    </span>
                  </p>
                </span>
                <ul
                  className={`submenu-list ${isManageUsersOpen ? "open" : ""}`}
                >
                  <li
                    className={activeTab === "EnrolledStudents" ? "active" : ""}
                    onClick={() => {
                      setActiveTab("EnrolledStudents");
                    }}
                  >
                    Enrolled Students
                  </li>
                  <li
                    className={activeTab === "SendInvitations" ? "active" : ""}
                    onClick={() => {
                      setActiveTab("SendInvitations");
                      fetchUsersByRole("STUDENT");
                    }}
                  >
                    Send Invitations
                  </li>
                  <li
                    className={activeTab === "Requests" ? "active" : ""}
                    onClick={() => {
                      setActiveTab("Requests");
                    }}
                  >
                    Requests
                  </li>
                </ul>
              </li>

              <li
                className={activeTab === "Videos" ? "active" : ""}
                onClick={() => {
                  setActiveTab("Videos");
                }}
              >
                Videos
              </li>
              {/* <li
                className={activeTab === "BlockedStudentsList" ? "active" : ""}
                onClick={() => {
                  setActiveTab("BlockedStudentsList");
                }}
              >
                Blocked Students List
              </li> */}
              <li
                onClick={() =>
                  handleLogOut(toast.success("User has been logged out"))
                }
              >
                Logout
              </li>
            </ul>
          </nav>
          <button className="adminPortal-logoutBtn" onClick={handleLogOut}>
            Logout / Sign-out
          </button>
        </div>

        <div className="teachersPortal-content">
          {activeTab === "Dashboard" && (
            <div className="teachersPortal-profile-div">
              <h2 className="teachersPortal-h2">Teacher Profile</h2>
              <TeacherAndStudentDash />
            </div>
          )}
          {activeTab === "EnrolledStudents" && (
            <div className="teachersPortal-Enrolled-div">
              <h2 className="teachersPortals-h2">Enrolled Students</h2>
              <EnrolledStudents />
            </div>
          )}
          {activeTab === "SendInvitations" && (
            <div className="teachersPortal-Invite-div">
              <h2 className="teachersPortal-h2">Invite Students</h2>
              <SendInvitations />
            </div>
          )}
          {activeTab === "Requests" && (
            <div className="teachersPortal-Requests-div">
              <h2 className="teachersPortal-h2">Requests</h2>
              <AcceptRequests />
            </div>
          )}
          {activeTab === "Videos" && (
            <div className="teachersPortal-Videos-div">
              <Videos />
            </div>
          )}
          {/* {activeTab === "BlockedStudentsList" && (
            <div className="teachersPortal-Blocked-div">
              <h2 className="teachersPortal-h2">Blocked Students List</h2>
              <BlockedStudents />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
