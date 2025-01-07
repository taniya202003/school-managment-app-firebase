import React, { useContext, useEffect } from "react";
import { ContextProvider } from "../../context/Context";

export const SendRequests = () => {
  const { filterUser, sendRequests, trackBtnToggle, requests} = useContext(ContextProvider);

  useEffect(() => {
    sendRequests();
  }, []);

console.log(filterUser,"filterUser")

  return (
    <div className="sendRequests-container">
      <div className="sendRequests-grid">
        {filterUser.length > 0 ? (
          filterUser.map((user, i) => (
            <div key={i} className="sendRequests-cards">
              <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
              <img src={user.photo} alt="teahers image" height="100px" />
              </div>
              <div className="requests-detailDiv">
                <p className="requests-p">
                  <b>Subject:</b> {user.subject}
                </p>
                <p className="requests-p">
                  <b>Username:</b> {user.userName}
                </p>
                <p className="requests-p">
                  <b>Email:</b> {user.email}
                </p>
              </div>

              <button
                className="sendRequest-btn"
                onClick={() => sendRequests(i)}
                disabled={requests[i] === "Done" || requests[i] === "Rejected"}
              >
                {trackBtnToggle && requests[i] === true
                  ? "Done"
                  : requests[i] === "Rejected"
                  ? "Rejected"
                  : "Send Request"}
              </button>
            </div>
          ))
        ) : (
          <p>Loading teachers data...</p>
        )}
      </div>
    </div>
  );
};
