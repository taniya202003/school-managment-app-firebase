import React, { useContext } from "react";
import { ContextProvider } from "../context/Context";

export const AdminDashboard = () => {
  const { users } = useContext(ContextProvider);

  return (
    <div className="adminDashboard-container">
      <div>
      {users.length > 0 ? (
        users.map((user, i) => (
          <div className="adminPortal-profilePicAndDetail" key={i}>
            <div className="adminPortal-profilePic-div">
              <img className="adminProfilePic"  src={user.photo} alt="adminProfilePic" height={"100px"} />
            </div>
            <div className="adminPortal-profileDetail-div">
              <p className="adminPortal-profile-p">
                <b>Name:</b> {user.userName}
              </p>
              <p className="adminPortal-profile-p">
                <b>Email:</b> {user.email}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>Loading Profile...</p>
      )}
    </div>
    </div>
  );
};
