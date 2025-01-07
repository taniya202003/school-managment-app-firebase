import React, { useContext, useEffect, useState } from "react";
import "../../assets/studentPortal.css";
import { ContextProvider } from "../../context/Context";
import { IoMdArrowDropdown } from "react-icons/io";
import { JavascriptClasses } from "../teacher-and-students-sidebar/JavascriptClasses";
import { ReactjsClasses } from "../teacher-and-students-sidebar/ReactjsClasses";
import { AcceptInvitations } from "../teacher-and-students-sidebar/AcceptInvitations";
import { SendRequests } from "../teacher-and-students-sidebar/SendRequests";
import { TeacherAndStudentDash } from "../teacher-and-students-sidebar/TeacherAndStudentDash";
import { toast } from "react-toastify";

export const StudentsPortal = () => {
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false);

  const {
    activeTab,
    setActiveTab,
    handleLogOut,
    fetchCurrentUser,
    fetchUsersByRole,
    fetchEnrolledSubject,
    setEnrolledTeachers
  } = useContext(ContextProvider);

  useEffect(() => {
    fetchUsersByRole("TEACHER");
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    let enrolledSubject;
    if (activeTab) {
      if (activeTab === "JavaScript") {
        enrolledSubject = "JavaScript";
      } else if (activeTab === "React_Js") {
        enrolledSubject = "React_Js";
      }
      fetchEnrolledSubject(enrolledSubject)
      .then((teachers) => {
        setEnrolledTeachers(teachers || []);
      });
    }
  }, [activeTab]);

  return (
    <div className="studentPortal-container">
      <h1 className="studentPortal-h1">Students Portal</h1>
      <div className="studentPortal-sidebarAndcontent">
        {/* Custom Sidebar */}
        <div className="studentPortal-sidebar">
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
                    Enrolled Classes
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
                      setActiveTab("JavaScript");
                      // fetchEnrolledSubject("JavaScript");
                    }}
                    className={
                      activeTab === "JavaScript" ? "active" : ""
                    }
                  >
                    JavaScript
                  </li>
                  <li
                    onClick={() => {
                      setActiveTab("React_Js");
                      // fetchEnrolledSubject("React Js");
                    }}
                    className={activeTab === "React_Js" ? "active" : ""}
                  >
                    React Js
                  </li>
                </ul>
              </li>

              <li
                className={activeTab === "Invitations" ? "active" : ""}
                onClick={() => {
                  setActiveTab("Invitations");
                }}
              >
                Invitations
              </li>

              <li
                className={activeTab === "SendRequests" ? "active" : ""}
                onClick={() => {
                  setActiveTab("SendRequests");
                  fetchUsersByRole("TEACHER");
                }}
              >
                Send Requests
              </li>

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

        <div className="studentPortal-content">
          {activeTab === "Dashboard" && (
            <div className="studentPortal-profile-div">
              <h2 className="studentPortal-h2">Student Profile</h2>
              <TeacherAndStudentDash />
            </div>
          )}
          {activeTab === "JavaScript" && (
            <div className="studentPortal-JavaScript-div">
              <h2 className="studentPortal-h2">Java Script Teachers</h2>
              <JavascriptClasses  />
            </div>
          )}
          {activeTab === "React_Js" && (
            <div className="studentPortal-ReactJs-div">
              <h2 className="studentPortal-h2">React Js Teachers</h2>
              <ReactjsClasses  />
            </div>
          )}
          {activeTab === "Invitations" && (
            <div className="studentPortal-Invitations-div">
              <h2 className="studentPortal-h2">INVITATIONS</h2>
              <AcceptInvitations />
            </div>
          )}
          {activeTab === "SendRequests" && (
            <div className="studentPortal-SendRequests-div">
              <h2 className="studentPortal-h2">Send Requests</h2>
              <SendRequests />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
