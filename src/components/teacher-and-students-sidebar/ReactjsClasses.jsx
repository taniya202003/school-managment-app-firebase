import React, { useContext, useEffect } from "react";
import { ContextProvider } from "../../context/Context";
import { useNavigate } from "react-router-dom";

export const ReactjsClasses = () => {
  const { loading, enrolledTeachers, fetchEnrolledSubject } = useContext(ContextProvider);

  const navigate = useNavigate()

  useEffect(() => {
    fetchEnrolledSubject("React_Js");
  }, []);

  if(loading){
    return "loading..."
  }


  const handleClassBtn = () => {
  
    navigate("/tutorialVideos", {state: {subject: "React_Js"}})
  }


  return (
    <div className="reactjs-container">
      <div className="teachers-grid">
      { enrolledTeachers?.teachers?.React_Js.length > 0 ? (
         enrolledTeachers?.teachers?.React_Js.map((user, i) => (
          <div className="teachers-cards" key={i}>
            <div className="teachers-img">
              <img className="img" src={user.photo} alt="teachers img" />
            </div>
            <div className="teachers-detailDiv">
              <p className="teachers-p">
                <b>Username: </b>
                {user.userName}
              </p>
              <p className="teachers-p">
                <b>Email: </b>
                {user.email}
              </p>
              <p className="teachers-p">
                <b>Subject: </b>
                {user.subject}
              </p>
              <button className="classes-btn" onClick={()=>handleClassBtn("React_Js")}>Watch Tutorials Videos</button>
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
