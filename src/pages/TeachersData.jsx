import React, { useContext, useEffect, useState } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import {
  MdBlock,
  MdDeleteForever,
  MdOutlineAssignmentInd,
} from "react-icons/md";
import { ContextProvider } from "../context/Context";

export const TeachersData = () => {
  const [cardsDropDown, setCardsDropDown] = useState(false);
  const [subjectDropDown, setSubjectDropDown] = useState(false);
  const { users, loading, blockUser, removeUser, assignSubject } = useContext(ContextProvider);

  if (loading) {
    return "Loading......";
  }

  console.log(users, "users")

  return (
    <div className="teachersData-container">
      <div className="adminPortal-profiles-grid">
        {users.length > 0 ? (
          users.map((user, i) => (
            <div className="adminPortal-profile-cards" key={i}>
              <div className="usersSettingDropDown">

                <button  className={`dropdown-menu ${
                    cardsDropDown === i ? "active" : ""
                  }`}
                  onClick={() =>
                    setCardsDropDown((prevState) =>
                      prevState === i ? null : i
                    )
                  }
                >
                  <PiDotsThreeOutlineFill size={17} />
                </button>

                {cardsDropDown === i && (
                  <div className="dropdown-menu-options">
                    <div>
                      <p className={`dropdown-menu-option ${
                          subjectDropDown === i ? "active" : ""
                        }`}
                        onClick={() => {
                          setSubjectDropDown((prevState) =>
                            prevState === i ? null : i
                          );
                        }}
                      >
                        <MdOutlineAssignmentInd size={17} /> Assign Subject
                      </p>
                      {subjectDropDown === i && (
                        <div>
                          <p onClick={() => assignSubject(i, "JavaScript")}>JavaScript</p>
                          <p onClick={() => assignSubject(i, "React_Js")}>React_Js</p>
                        </div>
                      )}
                    </div>

                    <p onClick={() => blockUser(i)}>
                      <MdBlock /> Block User
                    </p>
                    <p onClick={() => removeUser(i)}>
                      <MdDeleteForever size={17} /> Remove User
                    </p>
                  </div>
                )}
              </div>
              <img src={user.photo} alt="teacher profile pic" height="100px"/>
              <div className="adminPortal-profileDetail-div">
                <p>
                  <b>Name:</b> {user.userName}
                </p>
                <p>
                  <b>Email:</b> {user.email}
                </p>
                <p>
                  <b>Subject:</b> {user.subject}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No teachers found</p>
        )}
      </div>
    </div>
  );
};
