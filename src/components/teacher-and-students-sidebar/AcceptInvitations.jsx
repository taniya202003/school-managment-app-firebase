import React, { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../context/Context";

export const AcceptInvitations = () => {
  const { invitation, invitationResponse, acceptInvitation, rejectInvitation} = useContext(ContextProvider);

  useEffect(() => {
    invitationResponse();
  }, []);

  return (
    <div className="studentPortal-acceptInvitation">
      <div className="acceptInvitation-grid">
        {invitation.length > 0 ? (
          invitation.map((invi, i) => (
            <div key={i} className="acceptInvitation-cards">
              <img
                className="acceptInvitation-img"
                src={invi.photo}
                alt="senderImage"
                height={"100px"}
              />
              <div className="acceptInvitation-cards-detail">
                <p className="cards-detail-p">
                  <b>From:</b> {invi.from}
                </p>
                <p className="cards-detail-p">
                  <b>Subject:</b> {invi.subject}
                </p>
                <p className="cards-detail-p">
                  <b>Message:</b> {invi.message}
                </p>
                <p className="cards-detail-p">
                  <b>Response:</b> 
                  <button className="invitation-response-btn" onClick={()=> acceptInvitation(i)}>ACCEPT </button> or
                  <button className="invitation-response-btn" onClick={()=> rejectInvitation(i)}>REJECT </button>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No invitations received.</p>
        )}
      </div>
    </div>
  );
};
