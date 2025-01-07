import React, { useContext, useEffect, useState } from 'react'
import "../assets/adminPortal.css";
import { ContextProvider } from '../context/Context'

export const BlockedUsers = () => {
const {blockedUser, unBlockUser, loading, fetchBlockedUsers} = useContext(ContextProvider)

console.log(blockedUser,'blockedUser')

useEffect(()=>{
  fetchBlockedUsers()
},[])

if (loading) {
  return "Loading......"; 
}

  return (
    <div className='blockeduser-container'>
      <h2 className='blockeduser-heading'>Blocked Users List</h2>
      <div className='blockeduser-grid'>
      {blockedUser.length > 0 ? (
          blockedUser.map((user,i)=> (
            <div className='blockeduser-cards' key={i}>
               <img src={user.photo} alt="teacher profile pic" height="100px" />
              <div className="adminPortal-profileDetail-div">
                <p>
                  <b>Name:</b> {user.userName}
                </p>
                <p>
                  <b>Email:</b> {user.email}
                </p>
                <p>
                  <b>Role:</b> {user.role}
                </p>
              </div> 
              <button onClick={()=>unBlockUser(i)}>Un Block User</button>
            </div>
          ))
      ):(
        <p> no Blocked user found. </p>
      )
     }
      </div>
    </div>
  )
}


