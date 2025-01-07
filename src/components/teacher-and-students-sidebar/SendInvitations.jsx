import React, { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../context/Context";

export const SendInvitations = () => {
  const {
    sendInvitations,
    invitation,
    trackBtnToggle,
    enrolledStudent,
    acceptedStudentList,
    filteredUsers
  } = useContext(ContextProvider);

  useEffect(() => {
    enrolledStudent();
    acceptedStudentList()
  }, []);

  // const filteredUsers = users.filter((user) =>!enrolledStudents.some((enrolled) => enrolled?.id === user?.id) && 
  //                                             !acceptedStudent.some((accepted) => accepted?.id === user?.id));
  // - The `.some()` method checks whether at least one element in an array satisfies a given condition.
  // - It iterates through the array and stops as soon as it finds an element that meets the condition.
  // - If such an element exists, `.some()` returns `true`; otherwise, it returns `false`.
  

console.log(filteredUsers,"filteredUsers")

  return (
    <div className="sendInvitation-container">
      <div className="sendInvitation-grid">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, i) => (
            <div className="sendInvitation-profile-cards" key={i}>
              <img src={user.photo} alt="teacher profile pic" height="110px" />
              <div className="sendInvitation-profileDetail-div">
                <p>
                  <b>Name:</b> {user.userName}
                </p>
                <p>
                  <b>Email:</b> {user.email}
                </p>
              </div>

              <button
                className="sendInvitation-btn"
                onClick={() => sendInvitations(i)}
                disabled={
                  invitation[i] === "Done" || invitation[i] === "Rejected"
                }
              >
                {trackBtnToggle && invitation[i] === true
                  ? "Done"
                  : invitation[i] === "Rejected"
                  ? "Rejected"
                  : "Send Invitation"}
              </button>
            </div>
          ))
        ) : (
          <p>Loading students data...</p>
        )}
      </div>
    </div>
  );
};


