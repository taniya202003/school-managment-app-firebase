import React, { useContext, useState } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { MdBlock, MdDeleteForever, MdOutlineAssignmentInd } from "react-icons/md";
import { ContextProvider } from "../context/Context";

export const StudentsData = () => {
  const [cardsDropDown, setCardsDropDown] = useState(false);
  const { users, loading, blockUser, removeUser, assignSubject} = useContext(ContextProvider);

  if (loading) {
    return "Loading......";
  }

  return (
    <div className="studentsData-container">
      <div className="adminPortal-profiles-grid">
        {users.length > 0 ? (
          users.map((user, i) => (
            <div className="adminPortal-profile-cards" key={i}>
                   <div className="usersSettingDropDown">
                <button
                  className={`dropdown-menu ${
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
                    <p onClick={()=>blockUser(i)}>
                      <MdBlock /> Block User
                    </p>
                    <p onClick={()=>removeUser(i)}>
                      <MdDeleteForever size={17} /> Delete User
                    </p>
                  </div>
                )}
              </div>
              <img src={user.photo} alt="teacher profile pic"  height="100px" />
              <div className="adminPortal-profileDetail-div">
                <p>
                  <b>Name:</b> {user.userName}
                </p>
                <p>
                  <b>Email:</b> {user.email}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No students found</p>
        )}
      </div>
    </div>
  );
};
