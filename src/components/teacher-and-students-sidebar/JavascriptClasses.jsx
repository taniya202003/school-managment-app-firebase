import React, { useContext, useEffect } from "react";
import { ContextProvider } from "../../context/Context";
import { useNavigate } from "react-router-dom";

export const JavascriptClasses = () => {
  const { loading, enrolledTeachers, fetchEnrolledSubject } =
    useContext(ContextProvider);

const navigate = useNavigate()

  useEffect(() => {
    fetchEnrolledSubject("JavaScript");
  }, []);

  if (loading) {
    return "loading...";
  }

  const handleClassBtn = () => {
    navigate("/tutorialVideos",{state: {subject: "JavaScript"}})
  }

  return (
    <div className="javascript-container">
      <div className="teachers-grid">
        {enrolledTeachers?.teachers?.JavaScript?.length > 0 ? (
          enrolledTeachers?.teachers?.JavaScript?.map((user, i) => (
            <div className="teachers-cards" key={i}>
              <div className="teachers-img">
                <img className="img" src={user.photo} alt="teachers img" />
              </div>
              <div className="teachers-detailDiv">
                <div className="teachers-p">
                  <b>Username: </b>
                  <p className="p-teacher-data">{user.userName}</p>
                </div>
                <div className="teachers-p">
                  <b>Email: </b>
                  <p className="p-teacher-data"> {user.email}</p>
                </div>
                <div className="teachers-p">
                  <b>Subject: </b>
                  <p className="p-teacher-data">{user.subject}</p>
                </div>
                <button className="classes-btn" onClick={()=>handleClassBtn("JavaScript")}>Watch Tutorials Videos</button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
