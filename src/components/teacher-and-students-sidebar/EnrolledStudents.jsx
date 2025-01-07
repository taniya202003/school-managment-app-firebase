import React, { useContext, useEffect } from "react";
import { ContextProvider } from "../../context/Context";

export const EnrolledStudents = () => {
  const { enrolledStudents, enrolledStudent, acceptedStudentList, acceptedStudent } = useContext(ContextProvider);

  useEffect(() => {
    enrolledStudent();
    acceptedStudentList()
  }, []);

  return (
    <div className="enrolledstudents-container">

      <div className="enrolledStudent-list">
      <h2 className="teachersPortal-h2-A">Invited Students List</h2>
      <div className="enrolledstudents-grid">
      {enrolledStudents.length > 0 ? (
        enrolledStudents.map((user, i) => (
        <div className="enrolledstudents-cards" key={i}>
          <img className="enrolledstudents-img" src={user.photo} alt="enrolled student pic" height="100px"/>
          <div className="enrolledstudents-cardDetail">
            <p className="enrolledstudents-p"><b>Username:</b> {user.userName}</p>
            <p className="enrolledstudents-p"><b>Email:</b> {user.email}</p>
            <p className="enrolledstudents-p"><b>Enrolled Subject:</b> {user.enrolledSubject}</p>
            </div>
        </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
    </div>
    
<div className="middleLine"></div>

    <div className="acceptedStudent-list">
    <h2 className="teachersPortal-h2-B">Accepted Requests Student List</h2>
    <div className="enrolledstudents-grid">
      {acceptedStudent.length > 0 ? (
        acceptedStudent.map((user, i) => (
        <div className="enrolledstudents-cards" key={i}>
          <img className="enrolledstudents-img" src={user.photo} alt="enrolled student pic" height="100px"/>
          <div className="enrolledstudents-cardDetail">
            <p className="enrolledstudents-p"><b>Username:</b> {user.userName}</p>
            <p className="enrolledstudents-p"><b>Email:</b> {user.email}</p>
            <p className="enrolledstudents-p"><b>Enrolled Subject:</b> {user.enrolledSubject}</p>
            </div>
        </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
    </div>
    </div>
  );
};