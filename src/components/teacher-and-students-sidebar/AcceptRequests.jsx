import React, { useContext, useEffect } from "react";
import { ContextProvider } from "../../context/Context";

export const AcceptRequests = () => {
  const { requestsResponse, requests, acceptRequest, rejectRequest} = useContext(ContextProvider);

console.log(requests,"requests")

  useEffect(() => {
    requestsResponse();
  }, []);

  return (
    <div className="requests-container">
      <div className="requests-grid">
        {requests.length > 0 ? (
          requests.map((req, i) => (
            <div className="requests-cards" key={i}>
              <img className="requests-img" src={req.photo} alt="request sender pic" height="100px" />
              <div className="requests-detailDiv">
                <p className="requests-p">
                  <b>Username:</b> {req.from}
                </p>
                <p className="requests-p">
                  <b>Email:</b> {req.email}
                </p>
                <p className="requests-p">
                  <b>Message:</b> {req.message}
                </p>
                <p className="requests-p">
                  <b>Response:</b>
                  <button
                    className="requests-responseBtn"
                    onClick={()=>acceptRequest(i)}
                  >
                    Accept
                  </button>
                  or
                  <button
                    className="requests-responseBtn"
                    onClick={()=>rejectRequest(i)}
                  >
                    Reject
                  </button>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>no requests available</p>
        )}
      </div>
    </div>
  );
};
