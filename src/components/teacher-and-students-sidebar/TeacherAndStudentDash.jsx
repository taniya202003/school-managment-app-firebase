import React, { useContext } from "react";
import { ContextProvider } from "../../context/Context";

export const TeacherAndStudentDash = () => {
  const { currentUserProfile } = useContext(ContextProvider);
  // console.log(currentUserProfile,'currentUserProfile')

  return (
    <div className="teachersDasboard-container">
      {currentUserProfile ? (
        <div className="adminPortal-profilePicAndDetail">
          <div className="adminPortal-profilePic-div">
            <img
              src={currentUserProfile.photo}
              alt="adminProfilePic"
              height="100px"
            />
          </div>
          <div className="adminPortal-profileDetail-div">
            <p className="adminPortal-profile-p">
              <b>Name:</b> {currentUserProfile.userName}
            </p>
            <p className="adminPortal-profile-p">
              <b>Email:</b> {currentUserProfile.email}
            </p>
            {currentUserProfile.role === "TEACHER" && (
              <p className="adminPortal-profile-p">
                <b>Subject:</b> {currentUserProfile.subject}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
